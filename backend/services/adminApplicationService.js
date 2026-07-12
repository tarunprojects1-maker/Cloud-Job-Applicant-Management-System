const db = require("../config/db");

// Get All Applications
const getAllApplications = () => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT
        applications.id,
        applicants.full_name,
        applicants.email,
        jobs.company_name,
        jobs.job_title,
        applications.status,
        applications.applied_at
      FROM applications
      INNER JOIN applicants
        ON applications.applicant_id = applicants.id
      INNER JOIN jobs
        ON applications.job_id = jobs.id
      ORDER BY applications.id DESC
    `;

    db.query(query, (err, results) => {

      if (err) return reject(err);

      resolve({
        success: true,
        applications: results,
      });

    });

  });
};

// Update Status
const updateApplicationStatus = (id, status) => {
  return new Promise((resolve, reject) => {

    const query =
      "UPDATE applications SET status=? WHERE id=?";

    db.query(query, [status, id], (err) => {

      if (err) return reject(err);

      resolve({
        success: true,
        message: "Application Updated Successfully",
      });

    });

  });
};

module.exports = {
  getAllApplications,
  updateApplicationStatus,
};