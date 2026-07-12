import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/viewApplicants.css";

function ViewApplicants() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");

  const filteredApplicants = applicants.filter((applicant) =>
    applicant.full_name.toLowerCase().includes(search.toLowerCase()) ||
    applicant.email.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await API.get("/admin/applicants");
      setApplicants(response.data.applicants);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load applicants");
    }
  };

  const exportApplicantsCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Skills",
      "Experience",
      "Education"
    ];

    const rows = applicants.map(applicant => [
      applicant.id,
      applicant.full_name,
      applicant.email,
      applicant.phone,
      applicant.skills,
      applicant.experience,
      applicant.education
    ]);

    const csvContent = [
      headers,
      ...rows
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applicants.csv";
    link.click();
  };

  return (
    <div className="va-dashboard">
      {/* HEADER */}
      <div className="va-header">
        <div className="va-header-left">
          <h1 className="va-header-title">👥 View Applicants</h1>
          <p className="va-header-subtitle">Manage every registered applicant from one place.</p>
        </div>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="va-btn va-btn-primary va-btn-dashboard"
        >
          ← Dashboard
        </button>
      </div>

      {/* STATS */}
      <div className="va-stats-grid">
        <div className="va-stat-card">
          <div className="va-stat-icon va-stat-icon-blue">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="va-stat-content">
            <span className="va-stat-label">Total Applicants</span>
            <span className="va-stat-number">{applicants.length}</span>
            <span className="va-stat-trend">+12% this month</span>
          </div>
        </div>

        <div className="va-stat-card">
          <div className="va-stat-icon va-stat-icon-green">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div className="va-stat-content">
            <span className="va-stat-label">Resume Uploaded</span>
            <span className="va-stat-number">{applicants.filter(a => a.resume).length}</span>
            <span className="va-stat-trend">+4 this week</span>
          </div>
        </div>

        <div className="va-stat-card">
          <div className="va-stat-icon va-stat-icon-red">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="va-stat-content">
            <span className="va-stat-label">No Resume</span>
            <span className="va-stat-number">{applicants.filter(a => !a.resume).length}</span>
            <span className="va-stat-trend">Needs attention</span>
          </div>
        </div>
      </div>

      {/* SEARCH + EXPORT */}
      <div className="va-search-section">
        <div className="va-search-wrapper">
          <svg className="va-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search applicants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="va-search-input"
          />
        </div>
        <button onClick={exportApplicantsCSV} className="va-btn va-btn-green va-btn-export">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* APPLICANT LIST */}
      <div className="va-list">
        {filteredApplicants.map((applicant) => (
          <div key={applicant.id} className="va-row">
            {/* Avatar */}
            <div className="va-row-avatar">
              {applicant.profile_photo ? (
                <img
                  src={`http://localhost:5000/uploads/${applicant.profile_photo}`}
                  alt="Profile"
                  className="va-avatar-img"
                />
              ) : (
                <div className="va-avatar-placeholder">
                  {applicant.full_name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name */}
            <div className="va-row-name">
              <div className="va-row-name-text">{applicant.full_name}</div>
              <div className="va-row-email">{applicant.email}</div>
            </div>

            {/* Phone */}
            <div className="va-row-phone">
              {applicant.phone || "N/A"}
            </div>

            {/* Resume */}
            <div className="va-row-resume">
              {applicant.resume ? (
                <a
                  href={`http://localhost:5000/uploads/${applicant.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="va-resume-link"
                >
                  <span className="va-badge va-badge-green">✅ Resume</span>
                </a>
              ) : (
                <span className="va-badge va-badge-red">No Resume</span>
              )}
            </div>

            {/* Joined Date */}
            <div className="va-row-date">
              {applicant.created_at
                ? new Date(applicant.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </div>

            {/* Actions */}
            <div className="va-row-actions">
              <button
                onClick={() => navigate(`/admin/applicant/${applicant.id}`)}
                className="va-btn va-btn-primary va-btn-sm"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewApplicants;