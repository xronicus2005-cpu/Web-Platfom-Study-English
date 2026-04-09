import "./Statistics.css"
import { Users, UserPlus, TrendingUp } from "lucide-react" // Lucide ikonkalari

import { useState, useEffect } from "react"
import api from "../../api/axios"

const Statistics = () => {
  const [count, setCount] = useState({ totalUsers: 0, weeklyUsers: 0 })

  const getStat = async () =>{
    try{
      const res = await api.get("/getStat")
      setCount(res.data)
    }
    catch(err){

    }
  }

  useEffect(() => {
    getStat()
  } ,[])

  return (
    <section className="statistics-section">
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-badge">Live Updates</div>
          <h1 className="stats-main-title">Impact in Numbers<span>.</span></h1>
          <p className="stats-subtitle">Growing community of English learners at NSTU.</p>
        </div>

        <div className="statistics-grid">
          {/* Total Participants Card */}
          <div className="stat-card neon-variant">
            <div className="stat-card-glow"></div>
            <div className="stat-icon-wrapper">
              <Users size={32} />
            </div>
            <div className="stat-content">
              <h2>Total Participants</h2>
              <div className="stat-number-wrapper">
                <span className="stat-number">{count.totalUsers?.toLocaleString() || 0}</span>
                <span className="stat-plus">+</span>
              </div>
            </div>
            <div className="stat-progress-bar"><div className="progress-fill neon"></div></div>
          </div>

          {/* Weekly Joined Card */}
          <div className="stat-card neon-variant">
            <div className="stat-card-glow"></div>
            <div className="stat-icon-wrapper">
              <UserPlus size={32}/>
            </div>
            <div className="stat-content">
              <h2>Joined This Week</h2>
              <div className="stat-number-wrapper">
                <span className="stat-number">{count.weeklyUsers?.toLocaleString() || 0}</span>
                <TrendingUp size={20} className="trend-icon" />
              </div>
            </div>
            <div className="stat-progress-bar"><div className="progress-fill neon"></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics