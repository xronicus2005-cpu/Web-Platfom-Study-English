import { Rocket, Sparkles, ArrowRight } from "lucide-react"
import "./Advert.css"

const Advert = () => {
    return (
        <section className="advert-section">
            <div className="advert-wrapper">
                {/* Orqa fondagi harakatlanuvchi nurlar */}
                <div className="advert-glow-1"></div>
                <div className="advert-glow-2"></div>

                <div className="advert-content">
                    <div className="advert-badge-group">
                        <Sparkles size={14} className="sparkle-icon" />
                        <span className="advert-badge">IELTS Specialized</span>
                    </div>

                    <h1 className="advert-title">
                        Ready to <span>Elevate</span> Your Score?
                    </h1>

                    <p className="advert-description">
                        Experience 30+ professional practice modules designed by experts to master your 
                        IELTS Reading and Listening skills. Real-time tracking, detailed analytics, 
                        and a community of over {1000}+ students.
                    </p>

                    <div className="advert-actions">
                        <button className="advert-btn-primary">
                            <span>Get Started Now</span>
                            <Rocket size={18} />
                        </button>
                        <button className="advert-btn-secondary">
                            View Modules
                        </button>
                    </div>
                </div>

                {/* Bezak elementlari */}
                <div className="advert-decoration">
                    <div className="dec-circle"></div>
                    <div className="dec-line"></div>
                </div>
            </div>
        </section>
    )
}

export default Advert