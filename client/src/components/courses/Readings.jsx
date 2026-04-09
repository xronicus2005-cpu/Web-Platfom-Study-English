import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, BarChart2, ChevronDown, Rocket } from "lucide-react"
import "./Readings.css"

const readings = [
  {
    id: 1,
    title: "Reading Practice 1",
    description: "Deep dive into academic texts about renewable energy and global climate changes.",
    score: "34/40",
    band: "8.0",
    difficulty: "Academic"
  },
  {
    id: 2,
    title: "Reading Practice 2",
    description: "Exploring the history of ancient civilizations and archaeological discoveries.",
    score: "29/40",
    band: "6.5",
    difficulty: "Academic"
  },
  {
    id: 3,
    title: "Reading Practice 3",
    description: "Modern psychology and the impact of social media on human behavior.",
    score: "31/40",
    band: "7.0",
    difficulty: "Academic"
  }
]

const Readings = () => {
  const [openId, setOpenId] = useState(null)
  const navigate = useNavigate()

  const toggleCourse = (id) => {
    setOpenId(openId === id ? null : id)
  }

  const startPractice = (id) => {
    navigate(`/profile/reading/${id}`)
  }

  return (
    <div className="readings-wrapper">
      <div className="readings-header">
        <h2>Reading Modules</h2>
        <p>Master your comprehension skills with real-time feedback.</p>
      </div>

      
        {readings.map(reading => {
          const open = openId === reading.id

          return (
            <div key={reading.id} className={`course-card ${open ? "open" : ""}`}>
              <div className="course-header" onClick={() => toggleCourse(reading.id)}>
                <div className="course-main-info">
                  <div className={`diff-tag ${reading.difficulty.toLowerCase()}`}>
                    {reading.difficulty}
                  </div>
                  <div className="title-group">
                    <BookOpen size={18} className="read-icon" />
                    <h4>{reading.title}</h4>
                  </div>
                </div>

                <div className="course-stats">
                  <div className="stat-pill">
                    <BarChart2 size={14} />
                    <span>{reading.score}</span>
                  </div>
                  <div className="band-pill">Band {reading.band}</div>
                  <ChevronDown size={20} className={`chevron ${open ? "rotate" : ""}`} />
                </div>
              </div>

              <div className="dropdown-wrapper">
                <div className="course-dropdown">
                  <div className="description-text">
                    <p>{reading.description}</p>
                  </div>
                  <button className="start-neon-btn" onClick={() => startPractice(reading.id)}>
                    <Rocket size={18} />
                    <span>Launch Test</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      
    </div>
  )
}

export default Readings