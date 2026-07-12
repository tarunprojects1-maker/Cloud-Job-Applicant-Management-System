import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Clock, Building, ChevronRight, Search } from "lucide-react";
import ApplicantLayout from "../layouts/ApplicantLayout";
import API from "../services/api";
import "../styles/dashboard.css";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get("/jobs");
      
      let jobsData = response.data;
      if (response.data && response.data.jobs) {
        jobsData = response.data.jobs;
      }
      if (response.data && response.data.data) {
        jobsData = response.data.data;
      }
      
      if (!Array.isArray(jobsData)) {
        for (let key in response.data) {
          if (Array.isArray(response.data[key])) {
            jobsData = response.data[key];
            break;
          }
        }
      }
      
      if (Array.isArray(jobsData) && jobsData.length > 0) {
        const mappedJobs = jobsData.map((job) => ({
          id: job.id || job._id || Math.random(),
          title: job.title || job.job_title || job.name || "Job",
          company: job.company || job.company_name || job.employer || "Company",
          location: job.location || job.job_location || job.city || "Remote",
          type: job.type || job.job_type || job.employment_type || "Full Time",
          description: job.description || job.job_description || job.desc || "",
          salary: job.salary || job.salary_range || null,
          department: job.department || "General",
          postedDate: job.postedDate || job.createdAt || job.created_at || "Recently"
        }));
        setJobs(mappedJobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Apply function
  const handleApply = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("Applying with:", { applicant_id: user.id, job_id: jobId });
      
      const response = await API.post("/applications/apply", {
        applicant_id: user.id,
        job_id: jobId
      });
      
      console.log("Response:", response.data);
      
      if (response.data && response.data.success) {
        alert(response.data.message || "Application submitted successfully!");
        fetchJobs();
      } else {
        alert(response.data?.message || "Failed to apply. Please try again.");
      }
    } catch (error) {
      console.error("Error applying:", error);
      console.log("Error response:", error.response);
      const errorMsg = error.response?.data?.message || "Failed to apply. Please try again.";
      alert(errorMsg);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const search = searchTerm.toLowerCase();
    return (job.title || "").toLowerCase().includes(search) ||
           (job.company || "").toLowerCase().includes(search) ||
           (job.location || "").toLowerCase().includes(search);
  });

  return (
    <ApplicantLayout>
      <div className="jobs-page">
        <div className="jobs-header">
          <div>
            <h1 className="jobs-title">Available Jobs</h1>
            <p className="jobs-subtitle">Discover your next career opportunity</p>
          </div>
          <div className="jobs-stats">
            <span>{filteredJobs.length} positions available</span>
          </div>
        </div>

        <div className="jobs-toolbar">
          <div className="search-wrapper">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="search-input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-wrapper">
            <select 
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full time">Full Time</option>
              <option value="part time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchJobs}>Retry</button>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={48} />
            <h3>No jobs available</h3>
            <p>Check back later</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div className="job-company-icon">
                    {(job.company || "C")[0]}
                  </div>
                  <div>
                    <h3>{job.title}</h3>
                    <div>{job.company}</div>
                  </div>
                  <span className={`job-type ${(job.type || "").toLowerCase().replace(" ", "-")}`}>
                    {job.type}
                  </span>
                </div>
                <div className="job-card-body">
                  <p>{job.description}</p>
                  <div className="job-meta">
                    <span><MapPin size={16} /> {job.location}</span>
                    <span><Building size={16} /> {job.department}</span>
                    <span><Clock size={16} /> {job.postedDate}</span>
                  </div>
                </div>
                <div className="job-card-footer">
                  <div>{job.salary ? `$${job.salary}/year` : "Competitive"}</div>
                  <button className="apply-button" onClick={() => handleApply(job.id)}>
                    Apply Now <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ApplicantLayout>
  );
}

export default Jobs;