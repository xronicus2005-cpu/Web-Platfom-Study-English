import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext"

import logo from "../../assets/Logo2.png"

import { 
  Search, 
  Bell, 
  ChevronDown, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  User as UserIcon 
} from "lucide-react"; // Zamonaviyroq ikonka paketi
import { createPortal } from "react-dom";

import "./HeaderProfile.css";

const HeaderProfile = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {user, logout} = useAuth()
  const dropdownRef = useRef(null);

 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`dash-header ${scrolled ? "scrolled" : ""}`}>
      <div className="h-left-group">
        <img src={logo} alt="logo" className="logo-nstu"/>
        <h2 className="page-heading">Dashboard</h2>
      </div>

      <div className="h-center-search">
        <div className="search-pill">
          <Search size={18} className="search-icon" />
          <input placeholder="Search analytics..." />
          <kbd className="cmd-hint">S</kbd>
        </div>
      </div>

      <div className="h-right-group">
        {/* Bildirishnomalar uchun yangi element */}
        <button className="icon-btn-circle">
          <Bell size={20} />
          <span className="notification-badge" />
        </button>

        <div className="user-profile-zone" ref={dropdownRef}>
          <div 
            className={`user-trigger ${open ? 'is-active' : ''}`} 
            onClick={() => setOpen(!open)}
          >
            <div className="user-avatar-hex">
              {user?.imgProfile ? (
                <img src={user.imgProfile} alt="avatar" />
              ) : (
                <span className="initials-box">{user?.name?.[0]}</span>
              )}
            </div>
            
            <div className="user-meta">
              <span className="u-name">{user?.name || "Alex"}</span>
              <span className="u-status">{user?.account}</span>
            </div>
            <ChevronDown size={16} className={`arrow ${open ? 'up' : ''}`} />
          </div>

          {open && createPortal(
            <div className="modern-dropdown">
              <div className="dropdown-user-card">
                <p className="d-full-name">{user?.name} {user?.lastName}</p>
                <p className="d-email">{user?.email}</p>
              </div>
              
              <div className="dropdown-links">
                <Link to="/" className="d-link"><UserIcon size={18} /> Home</Link>
                <Link to="/settings" className="d-link"><Settings size={18} /> Settings</Link>
                <div className="d-sep" />
                <button onClick={logout} className="d-link logout"><LogOut size={18} /> Exit</button>
              </div>
            </div>,
            document.body
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderProfile;