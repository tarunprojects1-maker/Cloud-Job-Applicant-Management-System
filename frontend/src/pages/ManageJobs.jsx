import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/manageJobs.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ManageJobs() {
  const navigate = useNavigate();

  
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

const filteredJobs = jobs.filter((job) =>

  
  job.company_name.toLowerCase().includes(search.toLowerCase()) ||
  job.job_title.toLowerCase().includes(search.toLowerCase()) ||
  job.location.toLowerCase().includes(search.toLowerCase())
);

const totalJobs = jobs.length;

const fullTimeJobs = jobs.filter(
  (job) => job.job_type === "Full Time"
).length;

const internshipJobs = jobs.filter(
  (job) => job.job_type === "Internship"
).length;




const [editingId, setEditingId] = useState(null);

const [jobPDF, setJobPDF] = useState(null);

const [job, setJob] = useState({
  company_name: "",
  job_title: "",
  location: "",
  salary: "",
  job_type: "",
  experience: "",
  skills: "",
  last_date: "",
  description: "",
});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/admin/jobs");
      setJobs(response.data.jobs);
    } catch (error) {
     toast.error("Failed to delete job");
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

 const addJob = async () => {

  try {

    const formData = new FormData();

    formData.append("company_name", job.company_name);
    formData.append("job_title", job.job_title);
    formData.append("location", job.location);
    formData.append("salary", job.salary);
    formData.append("job_type", job.job_type);
    formData.append("experience", job.experience);
    formData.append("skills", job.skills);
    formData.append("last_date", job.last_date);
    formData.append("description", job.description);

    if (jobPDF) {
      formData.append("job_pdf", jobPDF);
    }

    await API.post("/admin/jobs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  toast.success("Job Added Successfully");

    setJob({
      company_name: "",
      job_title: "",
      location: "",
      salary: "",
      job_type: "",
      experience: "",
      skills: "",
      last_date: "",
      description: "",
    });

    setJobPDF(null);

    fetchJobs();

  } catch (error) {

    console.log(error);

   toast.error("Failed to add job");

  }

};
  
  const updateJob = async () => {

  try {

    const formData = new FormData();

    formData.append("company_name", job.company_name);
    formData.append("job_title", job.job_title);
    formData.append("location", job.location);
    formData.append("salary", job.salary);
    formData.append("job_type", job.job_type);
    formData.append("experience", job.experience);
    formData.append("skills", job.skills);
    formData.append("last_date", job.last_date);
    formData.append("description", job.description);

    if (jobPDF) {
      formData.append("job_pdf", jobPDF);
    }

    await API.put(`/admin/jobs/${editingId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

   toast.success("Job Updated Successfully");

    setEditingId(null);

    setJob({
      company_name: "",
      job_title: "",
      location: "",
      salary: "",
      job_type: "",
      experience: "",
      skills: "",
      last_date: "",
      description: "",
    });

    setJobPDF(null);

    fetchJobs();

  } catch (error) {

    console.log(error);

  toast.error("Failed to update job");

  }

};

const editJob = (selectedJob) => {

  setEditingId(selectedJob.id);

  setJob({
    company_name: selectedJob.company_name,
    job_title: selectedJob.job_title,
    location: selectedJob.location,
    salary: selectedJob.salary,
    job_type: selectedJob.job_type,
    description: selectedJob.description,
  });

};

  const deleteJob = async (id) => {

    const result = await Swal.fire({
  title: "Delete Job?",
  text: "This action cannot be undone.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#dc2626",
  cancelButtonColor: "#6b7280",
  confirmButtonText: "Yes, Delete",
  cancelButtonText: "Cancel",
});

if (!result.isConfirmed) {
  return;
}

    
    try {
      await API.delete(`/admin/jobs/${id}`);

      toast.success("Job Deleted Successfully");

      fetchJobs();

    } catch (error) {
     toast.error("Failed to delete job");
    }
  };

  const exportJobsCSV = () => {

  const headers = [
    "ID",
    "Company",
    "Job Title",
    "Location",
    "Salary",
    "Type",
    "Experience"
  ];

  const rows = jobs.map(job => [
    job.id,
    job.company_name,
    job.job_title,
    job.location,
    job.salary,
    job.job_type,
    job.experience
  ]);

  const csvContent = [
    headers,
    ...rows
  ]
    .map(e => e.join(","))
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "jobs.csv";

  link.click();

};

  return (
    <div className="manage-container">

      <div className="page-header">
  <button
    className="back-btn"
    onClick={() => navigate("/admin/dashboard")}
  >
    ← Back to Dashboard
  </button>

  <h1 className="manage-title">💼 Manage Jobs</h1>

  <p className="page-subtitle">
    Create, edit and manage all job postings.
  </p>
</div>

<div className="stats-grid">

  <div className="stat-card">
    <h3>{totalJobs}</h3>
    <p>Total Jobs</p>
  </div>

  <div className="stat-card">
    <h3>{fullTimeJobs}</h3>
    <p>Full Time</p>
  </div>

  <div className="stat-card">
    <h3>{internshipJobs}</h3>
    <p>Internships</p>
  </div>

</div>

      <hr />

      <div className="job-form-card">

<h2
  style={{
    marginBottom: "25px",
    color: "#1e293b",
  }}
>
  📄 Job Information
  
</h2>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  }}
>

<input
  name="company_name"
  placeholder="Company Name"
  value={job.company_name}
  onChange={handleChange}
 className="job-input"
/>

<input
  name="job_title"
  placeholder="Job Title"
  value={job.job_title}
  onChange={handleChange}
 className="job-input"
/>

<input
  name="location"
  placeholder="Location"
  value={job.location}
  onChange={handleChange}
 className="job-input"
/>

<input
  name="salary"
  placeholder="Salary"
  value={job.salary}
  onChange={handleChange}
  className="job-input"
/>

<input
  name="job_type"
  placeholder="Job Type"
  value={job.job_type}
  onChange={handleChange}
 className="job-input"
/>

<input
  name="experience"
  placeholder="Experience"
  value={job.experience}
  onChange={handleChange}
 className="job-input"
/>

<input
  name="skills"
  placeholder="Required Skills"
  value={job.skills}
  onChange={handleChange}
 className="job-input"
/>

<input
  type="date"
  name="last_date"
  value={job.last_date}
  onChange={handleChange}
 className="job-input"
/>

</div>

<textarea
  name="description"
  placeholder="Job Description"
  value={job.description}
  onChange={handleChange}
  rows="6"
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    resize: "vertical",
    boxSizing: "border-box",
  }}
/>

<input
  type="file"
  accept=".pdf"
  onChange={(e) => setJobPDF(e.target.files[0])}
/>

{jobPDF && (
  <p>Selected PDF: {jobPDF.name}</p>
)}

      <br /><br />

      

      <br /><br />

      <button
  onClick={editingId ? updateJob : addJob}
  className="primary-btn"
>
  {editingId ? "✏️ Update Job" : "➕ Add Job"}
</button>

{editingId && (
  <>
    <br /><br />

   <button
  onClick={() => {
    setEditingId(null);

    setJob({
      company_name: "",
      job_title: "",
      location: "",
      salary: "",
      job_type: "",
      experience: "",
      skills: "",
      last_date: "",
      description: "",
      job_pdf: null,
    });
  }}
  style={{
    background: "#6b7280",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "15px",
    marginTop: "20px",
  }}
>
  ❌ Cancel
</button>
  </>
)}
</div>

      <hr />

     <div className="section-header">

  <div className="section-title">
    <h2>📋 Job Listings</h2>
    <p>Search, edit or remove existing jobs.</p>
  </div>

  <button
  className="export-btn"
  onClick={exportJobsCSV}
>
  📥 Export CSV
</button>

</div>

      <input
  type="text"
  placeholder="🔍 Search Company, Job or Location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    marginBottom: "25px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    boxSizing: "border-box",
  }}
/>
      

      <div className="table-card">
  <table className="jobs-table">
        <thead
  style={{
    background: "#2563eb",
    color: "#fff",
  }}
>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Job</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredJobs.map((job) => (

            <tr key={job.id}>

              <td>{job.id}</td>

              <td>{job.company_name}</td>

              <td>{job.job_title}</td>

              <td>{job.location}</td>

              <td>{job.salary}</td>

              <td>{job.job_type}</td>

              <td>

 <button
  className="edit-btn"
  onClick={() => editJob(job)}
>
  ✏️ Edit
</button>
 

<button
  className="delete-btn"
  onClick={() => deleteJob(job.id)}
>
  🗑 Delete
</button>
  

</td>



            </tr>

          ))}

        </tbody>

     </table>
</div>

    </div>
  );
}

export default ManageJobs;