function JobCard({ job, onApply }) {
  console.log(job);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "25px",
        marginBottom: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#1e293b",
            }}
          >
            {job.job_title}
          </h2>

          <h4
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            {job.company_name}
          </h4>
        </div>

        <span
          style={{
            background: "#DBEAFE",
            color: "#2563EB",
            padding: "6px 15px",
            borderRadius: "20px",
            fontWeight: "600",
          }}
        >
          {job.job_type}
        </span>
      </div>

      <hr
        style={{
          margin: "20px 0",
        }}
      />

      {/* Job Details */}

      <p>📍 <strong>Location:</strong> {job.location}</p>

      <p>💰 <strong>Salary:</strong> {job.salary}</p>

      <p>💼 <strong>Experience:</strong> {job.experience}</p>

      <p>🛠 <strong>Skills:</strong> {job.skills}</p>

      <p>📅 <strong>Last Date:</strong> {job.last_date}</p>

      <p
        style={{
          marginTop: "15px",
          lineHeight: "28px",
          color: "#475569",
        }}
      >
        {job.description}
      </p>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        {job.job_pdf && (
          <a
            href={`http://localhost:5000/uploads/${job.job_pdf}`}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#10B981",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            📄 View Job Description
          </a>
        )}

        <button
          onClick={() => onApply(job.id)}
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;