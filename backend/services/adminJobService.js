const db = require("../config/db");

// Get All Jobs
const getAllJobs = () => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT *
      FROM jobs
      ORDER BY id DESC
    `;

    db.query(query, (err, results) => {

      if (err) return reject(err);

      resolve({
        success: true,
        jobs: results,
      });

    });

  });
};

// Add Job
const addJob = (job) => {
  return new Promise((resolve, reject) => {

    const query = `
INSERT INTO jobs
(
company_name,
job_title,
location,
salary,
job_type,
experience,
skills,
last_date,
description,
job_pdf
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.query(
      query,
      [
job.company_name,
job.job_title,
job.location,
job.salary,
job.job_type,
job.experience,
job.skills,
job.last_date,
job.description,
job.job_pdf,
],
      (err) => {

        if (err) return reject(err);

        resolve({
          success: true,
          message: "Job Added Successfully",
        });

      }
    );

  });
};

// Delete Job
const deleteJob = (id) => {
  return new Promise((resolve, reject) => {

    db.query(
      "DELETE FROM applications WHERE job_id = ?",
      [id],
      (err) => {

        if (err) return reject(err);

        db.query(
          "DELETE FROM jobs WHERE id = ?",
          [id],
          (err2) => {

            if (err2) return reject(err2);

            resolve({
              success: true,
              message: "Job Deleted Successfully",
            });

          }
        );

      }
    );

  });
};

// Update Job
const updateJob = (id, job) => {
  return new Promise((resolve, reject) => {

    const query = `
      UPDATE jobs
SET
company_name=?,
job_title=?,
location=?,
salary=?,
job_type=?,
experience=?,
skills=?,
last_date=?,
description=?,
job_pdf=COALESCE(?, job_pdf)
WHERE id=?
    `;

    db.query(
      query,
      [
job.company_name,
job.job_title,
job.location,
job.salary,
job.job_type,
job.experience,
job.skills,
job.last_date,
job.description,
job.job_pdf,
id
],
      (err) => {

        if (err) return reject(err);

        resolve({
          success: true,
          message: "Job Updated Successfully",
        });

      }
    );

  });
};

module.exports = {
  getAllJobs,
  addJob,
  updateJob,
  deleteJob,
};