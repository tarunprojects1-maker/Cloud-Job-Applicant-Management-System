import { Sparkles, ArrowRight } from "lucide-react";

function WelcomeCard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="welcome-hero">
      <div className="welcome-content">
        <div className="welcome-badge">
          <Sparkles size={14} />
          <span>Welcome Back</span>
        </div>
        <h1 className="welcome-title">
          Good to see you, <span className="welcome-name">{user?.full_name || "Applicant"}</span> 👋
        </h1>
        <p className="welcome-subtitle">
          Track your applications, discover new opportunities, and manage your profile from one place.
        </p>
        <div className="welcome-actions">
          <button className="welcome-btn-primary">
            Browse Jobs
            <ArrowRight size={16} />
          </button>
          <button className="welcome-btn-secondary">View Applications</button>
        </div>
      </div>
      <div className="welcome-illustration">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />
        <div className="floating-shape shape-4" />
        <div className="welcome-stats-badge">
          <div className="stat-badge-item">
            <span className="stat-badge-number">95%</span>
            <span className="stat-badge-label">Profile Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;