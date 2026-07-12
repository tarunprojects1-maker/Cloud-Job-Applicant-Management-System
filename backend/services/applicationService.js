const db = require("../config/db");

// Apply for Job
const applyJob = (applicantId, jobId) => {
  return new Promise((resolve, reject) => {

    console.log("=== APPLICATION SERVICE ===");
    console.log("applyJob called with:");
    console.log("applicantId:", applicantId);
    console.log("jobId:", jobId);
    console.log("Type of applicantId:", typeof applicantId);
    console.log("Type of jobId:", typeof jobId);

    // Check if applicant_id and job_id are numbers
    const applicantIdNum = parseInt(applicantId);
    const jobIdNum = parseInt(jobId);

    if (isNaN(applicantIdNum) || isNaN(jobIdNum)) {
      console.log("Invalid IDs - not numbers");
      return resolve({
        success: false,
        message: "Invalid applicant_id or job_id"
      });
    }

    const checkQuery =
      "SELECT * FROM applications WHERE applicant_id = ? AND job_id = ?";

    console.log("Check query:", checkQuery);
    console.log("Check values:", [applicantIdNum, jobIdNum]);

    db.query(checkQuery, [applicantIdNum, jobIdNum], (err, result) => {
      if (err) {
        console.log("Check query error:", err);
        return reject(err);
      }

      console.log("Check result count:", result.length);

      if (result.length > 0) {
        return resolve({
          success: false,
          message: "You have already applied for this job.",
        });
      }

      const insertQuery =
        "INSERT INTO applications (applicant_id, job_id, status, applied_at) VALUES (?, ?, 'pending', NOW())";

      console.log("Insert query:", insertQuery);
      console.log("Insert values:", [applicantIdNum, jobIdNum]);

     db.query(insertQuery, [applicantIdNum, jobIdNum], (err, insertResult) => {
  if (err) {
    console.log("========== MYSQL ERROR ==========");
    console.log(err);
    console.log("Code:", err.code);
    console.log("Message:", err.message);
    console.log("SQL State:", err.sqlState);
    console.log("SQL:", err.sql);
    console.log("=================================");
    return reject(err);
  }

        console.log("Insert successful:", insertResult);

        resolve({
          success: true,
          message: "Application Submitted Successfully!",
        });
      });
    });
  });
};

// Get My Applications
const getMyApplications = (applicantId) => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT
        applications.id,
        jobs.company_name,
        jobs.job_title,
        jobs.location,
        jobs.salary,
        jobs.job_type,
        applications.status,
        applications.applied_at
      FROM applications
      INNER JOIN jobs
      ON applications.job_id = jobs.id
      WHERE applications.applicant_id = ?
      ORDER BY applications.applied_at DESC
    `;

    db.query(query, [applicantId], (err, results) => {
      if (err) return reject(err);

      resolve({
        success: true,
        applications: results,
      });
    });

  });
};

module.exports = {
  applyJob,
  getMyApplications,
};