import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Lock, User, ArrowRight, Sparkles } from "lucide-react"; // Ikonkalar
import "./SignIn.css";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const {setUser} = useAuth()
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const enterAccount = async(e) => {
    e.preventDefault();

    try{

      const res = await api.post("/login", loginData)

      if(res.data.success == true){
        setUser(res.data.user)
        toast.success("Logged Succesfully!")
        navigate("/profile")
      }

    }
    catch(err){
      toast.error("Something Getting Worng Please try again")
    }
  }


  return (
    <div className="signin-page">
      {/* Orqa fondagi cinematic effektlar */}
      <div className="signin-glow-1"></div>
      <div className="signin-glow-2"></div>

      <div className="signin-container">
        <form className="signin-card" onSubmit={enterAccount}>
          <div className="signin-header">
            <div className="signin-icon-box">
              <Sparkles className="neon-icon" />
            </div>
            <h2 className="signin-title">Welcome Back<span>.</span></h2>
            <p className="signin-subtitle">Enter your details to access your dashboard</p>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="login"
                placeholder="Login or Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="signin-btn" type="submit">
            Sign In <ArrowRight size={18} />
          </button>

          <div className="signin-footer">
            <p>Don't have an account?</p>
            <Link to="/sign-up" className="create-link">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;