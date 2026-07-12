const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Admin Login
const loginAdmin = (email, password) => {
  return new Promise((resolve, reject) => {

    const query = "SELECT * FROM admins WHERE email = ?";

    db.query(query, [email], async (err, results) => {

      if (err) return reject(err);

      if (results.length === 0) {
        return resolve({
          success: false,
          message: "Invalid Email or Password",
        });
      }

      const admin = results[0];

      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        return resolve({
          success: false,
          message: "Invalid Email or Password",
        });
      }

      resolve({
  success: true,
  message: "Admin Login Successful",
  firstLogin: admin.is_first_login,
  admin,
});

    });

  });
};

const changePassword = (adminId, password) => {
  return new Promise(async (resolve, reject) => {

    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        UPDATE admins
        SET password = ?, is_first_login = FALSE
        WHERE id = ?
      `;

      db.query(query, [hashedPassword, adminId], (err) => {

        if (err) return reject(err);

        resolve({
          success: true,
          message: "Password Updated Successfully",
        });

      });

    } catch (error) {
      reject(error);
    }

  });
};

const forgotPassword = (email, password) => {
  return new Promise(async (resolve, reject) => {

    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        UPDATE admins
        SET password = ?
        WHERE email = ?
      `;

      db.query(query, [hashedPassword, email], (err, result) => {

        if (err) return reject(err);

        if (result.affectedRows === 0) {
          return resolve({
            success: false,
            message: "Admin not found",
          });
        }

        resolve({
          success: true,
          message: "Password Reset Successfully",
        });

      });

    } catch (error) {
      reject(error);
    }

  });
};

// Dashboard Statistics
const getDashboardStats = () => {
  return new Promise((resolve, reject) => {

    const applicantQuery =
      "SELECT COUNT(*) AS totalApplicants FROM applicants";

    const jobQuery =
      "SELECT COUNT(*) AS totalJobs FROM jobs";

    const applicationQuery =
      "SELECT COUNT(*) AS totalApplications FROM applications";

    db.query(applicantQuery, (err, applicantResult) => {

      if (err) return reject(err);

      db.query(jobQuery, (err, jobResult) => {

        if (err) return reject(err);

        db.query(applicationQuery, (err, applicationResult) => {

          if (err) return reject(err);

          resolve({
            success: true,
            totalApplicants: applicantResult[0].totalApplicants,
            totalJobs: jobResult[0].totalJobs,
            totalApplications: applicationResult[0].totalApplications,
          });

        });

      });

    });

  });
};

// Get All Applicants
const getAllApplicants = () => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT
  applicants.id,
  applicants.full_name,
  applicants.email,
  applicant_profiles.phone,
  applicant_profiles.skills,
  applicant_profiles.experience,
  applicant_profiles.education,
  applicant_profiles.profile_photo,
  applicant_profiles.resume
      FROM applicants
      LEFT JOIN applicant_profiles
      ON applicants.id = applicant_profiles.applicant_id
      ORDER BY applicants.id DESC
    `;

    db.query(query, (err, results) => {

      if (err) return reject(err);

      resolve({
        success: true,
        applicants: results,
      });

    });

  });
};

// Get One Applicant
const getApplicantById = (id) => {

  return new Promise((resolve, reject) => {

    const query = `
      SELECT
        applicants.id,
        applicants.full_name,
        applicants.email,
        applicant_profiles.phone,
        applicant_profiles.skills,
        applicant_profiles.experience,
        applicant_profiles.education,
        applicant_profiles.profile_photo,
        applicant_profiles.resume
      FROM applicants
      LEFT JOIN applicant_profiles
      ON applicants.id = applicant_profiles.applicant_id
      WHERE applicants.id = ?
    `;

    db.query(query, [id], (err, results) => {

      if (err) return reject(err);

      resolve({
        success: true,
        applicant: results[0],
      });

    });

  });

};

// Recent Applications
const getRecentApplications = () => {
  return new Promise((resolve, reject) => {

    const query = `
      SELECT
        applications.id,
        applicants.full_name,
        jobs.company_name,
        jobs.job_title,
        applications.status
      FROM applications
      JOIN applicants
        ON applications.applicant_id = applicants.id
      JOIN jobs
        ON applications.job_id = jobs.id
      ORDER BY applications.id DESC
      LIMIT 5
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

module.exports = {
  loginAdmin,
  changePassword,
  forgotPassword,
  getDashboardStats,
  getAllApplicants,
  getApplicantById,
  getRecentApplications,
};