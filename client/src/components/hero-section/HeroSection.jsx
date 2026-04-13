import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { ArrowRight } from "lucide-react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";


// Rasmlarni o'zingni manzilingdan import qilamiz
import photo1 from "../../assets/photo3.png";
import photo2 from "../../assets/photo2.png";
import photo3 from "../../assets/photo4.png";

import "./HeroSection.css";

// Slides ma'lumotlarini komponent ichida saqlaymiz
const slides = [
  { img: photo1, title: "Practice English Every Day", subtitle: "Small steps lead to big progress" },
  { img: photo2, title: "Enjoy Learning", subtitle: "Students learning and smiling together" },
  { img: photo3, title: "Graduate With Confidence", subtitle: "Celebrate success and new beginnings" }
];

const HeroSection = () => {

  const { user, logout } = useAuth()

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Avtomatik slider almashishi
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Dropdown tashqarisiga bosilganda yopilishi
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="hero-master">
      {/* HEADER: Navigatsiya */}
      <header className="hero-header-nav">
        <div className="hero-logo">
          <Link to="/">NSTU<span>.</span>English</Link>
        </div>

        <div className="hero-actions">
          {!user ? (
            <div className="hero-auth-links">
              <Link to="/sign-in" className="h-btn-glass">Sign In</Link>
              <Link to="/sign-up" className="h-btn-neon">Join Now</Link>
            </div>
          ) : (
            <div className="hero-user-profile" ref={dropdownRef}>
              <div className="hero-avatar-trigger" onClick={() => setOpen(!open)}>
                <div className="avatar-frame">
                  {user?.imgProfile ? (
                    <img src={user.imgProfile} alt="me" />
                  ) : (
                    <div className="hero-initials">
                      {user?.name?.[0]}{user?.lastName?.[0]}
                    </div>
                  )}
                  {!user && <AccountCircleIcon className="h-icon-def" />}
                </div>
                <span className="hero-`user-name">{user?.name}</span>
              </div>

              {open && (
                <div className="hero-menu-dropdown">
                  <div className="dropdown-info">
                    <p>{user?.email || "user@nstu.uz"}</p>
                  </div>
                  <Link className="h-menu-item" to="/profile"><PersonIcon /> Dashboard</Link>
                  <Link className="h-menu-item" to="/settings"><SettingsIcon /> Settings</Link>
                  <div className="h-divider" />
                  <button className="h-menu-item h-logout" onClick={logout}><LogoutIcon /> Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* SLIDER ENGINE */}
      <div className="hero-slider-engine">
        {slides.map((slide, i) => (
          <div key={i} className={`hero-frame ${i === index ? "active" : ""}`}>
            <div
              className="hero-bg-image"
              style={{ backgroundImage: `linear-gradient(to right, rgba(11, 15, 26, 0.9), rgba(11, 15, 26, 0.4)), url(${slide.img})` }}
            />
            <div className="hero-content">
              <div className="hero-badge">NSTU Project 2026</div>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <div className="hero-cta-group">
                <button className="h-main-cta">
                  Get Started <ArrowRight size={20} />
                </button>
                <button className="h-secondary-cta">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS: Slide ko'rsatkichlari */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
