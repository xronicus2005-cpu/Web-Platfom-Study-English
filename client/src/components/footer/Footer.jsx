import { Link } from "react-router-dom";
import { Send, Globe, ShieldCheck, HelpCircle } from "lucide-react";
import "./Footer.css";

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <footer className="footer-master">
            <div className="footer-blur-bg"></div>
            
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-section brand-info">
                    <div className="footer-logo">
                        NSTU<span>.</span>English
                    </div>
                    <p>
                        A premium educational ecosystem engineered to accelerate English 
                        mastery through cutting-edge analytics and immersive practice.
                    </p>
                    <div className="social-pills">
                        <a href="#" className="social-pill"><Send size={18} /></a>
                        <a href="#" className="social-pill"><InstagramIcon size={18} /></a>
                        <a href="#" className="social-pill"><LinkedInIcon size={18} /></a>
                        <a href="#" className="social-pill"><FacebookIcon size={18} /></a>
                    </div>
                </div>

                {/* Links Section 1 */}
                <div className="footer-section links-group">
                    <h3>Explore</h3>
                    <div className="footer-links">
                        <Link to="/reading"><div className="dot"></div> Reading Modules</Link>
                        <Link to="/listening"><div className="dot"></div> Listening Tests</Link>
                        <Link to="/profile"><div className="dot"></div> Student Dashboard</Link>
                        <Link to="/leaderboard"><div className="dot"></div> Rankings</Link>
                    </div>
                </div>

                {/* Links Section 2 */}
                <div className="footer-section links-group">
                    <h3>Resources</h3>
                    <div className="footer-links">
                        <a href="#"><HelpCircle size={16} /> Help Center</a>
                        <a href="#"><Globe size={16} /> Faculty Page</a>
                        <a href="#"><ShieldCheck size={16} /> Privacy Policy</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} Nukus State Technological University.</p>
                    <div className="footer-motto">Built for Future Educators</div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;