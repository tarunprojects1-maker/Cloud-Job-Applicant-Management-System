import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalApplicants: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const chartData = [
    {
      name: "Applicants",
      value: stats.totalApplicants || 0,
    },
    {
      name: "Jobs",
      value: stats.totalJobs || 0,
    },
    {
      name: "Applications",
      value: stats.totalApplications || 0,
    },
  ];

  const [recentApplications, setRecentApplications] = useState([]);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/admin/login");
      return;
    }

    fetchDashboardStats();
    fetchRecentApplications();
  }, []);

  // Update date every minute with IST
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        })
      );
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await API.get("/admin/dashboard");
      setStats(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load dashboard.");
    }
  };

  const fetchRecentApplications = async () => {
    try {
      const response = await API.get("/admin/recent-applications");
      setRecentApplications(response.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      Accepted: "badge-accepted",
      Rejected: "badge-rejected",
      Applied: "badge-applied",
      Shortlisted: "badge-shortlisted",
    };
    return statusMap[status] || "badge-applied";
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <div className="brand">
            <span className="brand-icon">☰</span>
            <h2>Admin Dashboard</h2>
          </div>
          <div className="nav-links">
            <span className="nav-link active" onClick={() => navigate("/admin/dashboard")}>
              Dashboard
            </span>
            <span className="nav-link" onClick={() => navigate("/admin/applicants")}>
              Applicants
            </span>
            <span className="nav-link" onClick={() => navigate("/admin/applications")}>
              Applications
            </span>
            <span className="nav-link" onClick={() => navigate("/admin/jobs")}>
              Jobs
            </span>
          </div>
        </div>
        <div className="navbar-right">
          <div className="notification-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="notification-dot"></span>
          </div>
          <div className="admin-avatar">
            <span>A</span>
          </div>
          <button className="logout-btn" onClick={logout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <h1>Welcome back, Admin! 👋</h1>
            <p>Manage applicants, jobs and applications from one place.</p>
          </div>
          <div className="date-card">
            <div className="date-icon">📅</div>
            <div className="date-info">
              <h3>Today</h3>
              <p>{currentDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards - PREMIUM REDESIGN */}
      <div className="stats-grid">
        <div className="stat-card stat-card-applicants">
          <div className="stat-card-inner">
            <div className="stat-left">
              <div className="stat-icon-container">
                <span className="stat-icon">👥</span>
              </div>
              <div className="stat-info">
                <h3 className="stat-title">Total Applicants</h3>
                <div className="stat-number">{stats.totalApplicants}</div>
                <div className="stat-subtitle">Registered Applicants</div>
              </div>
            </div>
            <div className="stat-right">
              <svg className="stat-sparkline" viewBox="0 0 120 40" fill="none">
                <path d="M2 38 L20 30 L35 35 L50 20 L70 28 L90 15 L105 22 L118 10" 
                      stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 38 L20 30 L35 35 L50 20 L70 28 L90 15 L105 22 L118 10" 
                      stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.15"/>
                <circle cx="118" cy="10" r="4" fill="#2563EB"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-applications">
          <div className="stat-card-inner">
            <div className="stat-left">
              <div className="stat-icon-container">
                <span className="stat-icon">📄</span>
              </div>
              <div className="stat-info">
                <h3 className="stat-title">Total Applications</h3>
                <div className="stat-number">{stats.totalApplications}</div>
                <div className="stat-subtitle">Job Applications</div>
              </div>
            </div>
            <div className="stat-right">
              <svg className="stat-sparkline" viewBox="0 0 120 40" fill="none">
                <path d="M2 35 L20 28 L35 32 L50 18 L70 25 L90 12 L105 20 L118 8" 
                      stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 35 L20 28 L35 32 L50 18 L70 25 L90 12 L105 20 L118 8" 
                      stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.15"/>
                <circle cx="118" cy="8" r="4" fill="#F59E0B"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-jobs">
          <div className="stat-card-inner">
            <div className="stat-left">
              <div className="stat-icon-container">
                <span className="stat-icon">💼</span>
              </div>
              <div className="stat-info">
                <h3 className="stat-title">Total Jobs</h3>
                <div className="stat-number">{stats.totalJobs}</div>
                <div className="stat-subtitle">Active Jobs</div>
              </div>
            </div>
            <div className="stat-right">
              <svg className="stat-sparkline" viewBox="0 0 120 40" fill="none">
                <path d="M2 32 L20 25 L35 30 L50 15 L70 22 L90 10 L105 18 L118 5" 
                      stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 32 L20 25 L35 30 L50 15 L70 22 L90 10 L105 18 L118 5" 
                      stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.15"/>
                <circle cx="118" cy="5" r="4" fill="#10B981"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* System Overview Chart */}
        <div className="chart-section">
          <div className="section-header">
            <h2>📊 System Overview</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} fontWeight={500} />
                <YAxis stroke="#64748B" fontSize={12} fontWeight={500} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                    padding: '12px 16px'
                  }}
                  cursor={{ fill: 'rgba(37, 99, 235, 0.05)' }}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[8, 8, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="applications-section">
          <div className="section-header">
            <h2>📄 Recent Applications</h2>
          </div>
          <div className="table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Company</th>
                  <th>Job</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="applicant-cell">
                        <div className="applicant-avatar">
                          {getInitials(application.full_name)}
                        </div>
                        <span>{application.full_name}</span>
                      </div>
                    </td>
                    <td>{application.company_name}</td>
                    <td>{application.job_title}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentApplications.length === 0 && (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      No recent applications
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;