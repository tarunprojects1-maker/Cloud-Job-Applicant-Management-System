import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/ViewApplications.css";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/admin/applications");
      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load applications");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put("/admin/applications/status", {
        id,
        status,
      });

      toast.success("Status Updated Successfully");
      fetchApplications();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  const exportApplicationsCSV = () => {
    const headers = [
      "ID",
      "Applicant",
      "Email",
      "Company",
      "Job",
      "Status"
    ];

    const rows = filteredApplications.map(app => [
      app.id,
      app.full_name,
      app.email,
      app.company_name,
      app.job_title,
      app.status
    ]);

    const csv = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      application.full_name.toLowerCase().includes(search.toLowerCase()) ||
      application.company_name.toLowerCase().includes(search.toLowerCase()) ||
      application.job_title.toLowerCase().includes(search.toLowerCase()) ||
      application.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalApplications = applications.length;
  const acceptedCount = applications.filter((a) => a.status === "Accepted").length;
  const rejectedCount = applications.filter((a) => a.status === "Rejected").length;
  const appliedCount = applications.filter((a) => a.status === "Applied").length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;

  return (
    <div className="admin-dashboard">
      {/* Header Section */}
      <div className="header-row">
        <div className="header-left">
          <h1>📄 Application Management</h1>
          <p>Manage every job application from one place.</p>
        </div>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="btn-dashboard"
        >
          ← Dashboard
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="toolbar-card">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search applicant, company, job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Shortlisted">Shortlisted</option>
        </select>

        <button
          onClick={exportApplicationsCSV}
          className="btn-export"
        >
          📥 Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">📊</div>
            <span className="stat-trend">↑ 12%</span>
          </div>
          <div className="stat-title">Total</div>
          <div className="stat-number">{totalApplications}</div>
          <div className="stat-desc">● all applications</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">✅</div>
            <span className="stat-trend">↑ 8%</span>
          </div>
          <div className="stat-title">Accepted</div>
          <div className="stat-number">{acceptedCount}</div>
          <div className="stat-desc">● hired</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon red">❌</div>
            <span className="stat-trend">↓ 2%</span>
          </div>
          <div className="stat-title">Rejected</div>
          <div className="stat-number">{rejectedCount}</div>
          <div className="stat-desc">● declined</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon orange">⏳</div>
            <span className="stat-trend">— 0%</span>
          </div>
          <div className="stat-title">Applied</div>
          <div className="stat-number">{appliedCount}</div>
          <div className="stat-desc">● pending</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon purple">⭐</div>
            <span className="stat-trend">↑ 5%</span>
          </div>
          <div className="stat-title">Shortlisted</div>
          <div className="stat-number">{shortlistedCount}</div>
          <div className="stat-desc">● review</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="app-list">
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div>📭</div>
            <h3>No Applications Found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div key={application.id} className="app-row">
              <div className="app-avatar">
                {application.full_name.charAt(0)}
              </div>

              <div className="app-name">
                <h4>{application.full_name}</h4>
                <span>Applicant</span>
              </div>

              <div className="app-email">
                <span>Email</span>
                {application.email}
              </div>

              <div className="app-company">
                <span>Company</span>
                {application.company_name}
              </div>

              <div className="app-job">
                <span>Job</span>
                {application.job_title}
              </div>

              <div>
                <span className={`status-badge ${application.status.toLowerCase()}`}>
                  {application.status}
                </span>
              </div>

              <div className="action-group">
                <button
                  onClick={() => updateStatus(application.id, "Accepted")}
                  className="action-btn accept"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(application.id, "Rejected")}
                  className="action-btn reject"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(application.id, "Shortlisted")}
                  className="action-btn shortlist"
                >
                  Shortlist
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewApplications;