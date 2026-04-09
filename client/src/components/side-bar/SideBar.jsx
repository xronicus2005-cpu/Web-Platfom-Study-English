import { NavLink } from "react-router-dom";
import { Headphones, BookOpen, BarChart3, LayoutGrid } from "lucide-react";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      {/* Sidebar Top: Logo yoki Nom */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <LayoutGrid size={22} color="var(--color-neon)" />
        </div>
        <div className="si-de-logo">
          <p className="brand-name">Courses</p>
          <div className="brand-dot-side"/>
        </div>
        
      </div>

      <nav className="sidebar-nav">
        <div className="nav-label">Main Menu</div>
        
        <NavLink to="/profile" end className="nav-item">
          <Headphones size={20} className="nav-icon" />
          <span>Listening Tests</span>
          <div className="active-glow" />
        </NavLink>

        <NavLink to="/profile/readings" className="nav-item">
          <BookOpen size={20} className="nav-icon" />
          <span>Reading Tests</span>
          <div className="active-glow" />
        </NavLink>

        <NavLink to="/profile/results" className="nav-item">
          <BarChart3 size={20} className="nav-icon" />
          <span>Results</span>
          <div className="active-glow" />
        </NavLink>
      </nav>

      {/* Sidebar Footer: Mini Banner */}
      <div className="sidebar-footer">
        <div className="pro-box">
          <p>Practice Daily!</p>
          <small>Keep track of progress</small>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;