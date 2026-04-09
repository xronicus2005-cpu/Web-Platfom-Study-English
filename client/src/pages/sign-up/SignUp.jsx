import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import { toast } from "react-toastify";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext"

// Ikonkalar
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { User, Mail, Lock, UserCircle, Briefcase, ArrowRight, UserPlus } from "lucide-react";

import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
 
  const { setUser } = useAuth()
  
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    login: "",
    password: "",
    gender: "",
    who: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUser = async(e) => {
    e.preventDefault();
    try{
      const res = await api.post("/register", formData)

      if(res.data.success == true){
          setUser(res.data.user)
          toast.success("Welcome to the community!");
          navigate("/profile");
      }
    }
    catch(err){
        toast.error("Registration failed. Please try again.");
    }
  }



  return (
    <div className="signup-page">
      {/* Cinematic Background Glows */}
      <div className="signup-glow-1"></div>
      <div className="signup-glow-2"></div>

      <div className="signup-container">
        <form className="signup-card" onSubmit={createUser}>
          <div className="signup-header">
            <div className="signup-icon-box">
              <UserPlus className="neon-icon" />
            </div>
            <h2 className="signup-title">Join NSTU<span>.</span>English</h2>
            <p className="signup-subtitle">Start your journey to English mastery today</p>
          </div>

          <div className="signup-form-body">
            <div className="signup-grid">
              <div className="input-wrapper">
                <User className="input-icon" size={18} />
                <input type="text" name="name" placeholder="First name" onChange={handleChange} required />
              </div>
              <div className="input-wrapper">
                <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} required />
              </div>
            </div>

            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input type="text" name="login" placeholder="Login or Email" onChange={handleChange} required />
            </div>

            <div className="input-wrapper password-field">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityIcon sx={{fontSize: 20}}/> : <VisibilityOffIcon sx={{fontSize: 20}}/>}
              </span>
            </div>

            <div className="signup-grid">
              <div className="input-wrapper">
                <UserCircle className="input-icon" size={18} />
                <select name="gender" onChange={handleChange} required>
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="input-wrapper">
                <Briefcase className="input-icon" size={18} />
                <select name="who" onChange={handleChange} required>
                  <option value="">Status</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="pupil">Pupil</option>
                </select>
              </div>
            </div>
          </div>

          <button className="signup-btn" type="submit">
            Create Account <ArrowRight size={18} />
          </button>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/sign-in" className="login-link">Sign In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;