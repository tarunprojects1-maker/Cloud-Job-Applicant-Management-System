const db = require("../config/db");

// Save or Update Profile
const saveProfile = (profileData) => {
  return new Promise((resolve, reject) => {

    const {
      applicant_id,
      full_name,
      email,
      phone,
      skills,
      experience,
      education,
      resume,
    } = profileData;

    const checkSql =
      "SELECT id FROM applicant_profiles WHERE applicant_id = ?";

    db.query(checkSql, [applicant_id], (err, result) => {

      if (err) return reject(err);

      if (result.length > 0) {

        const updateSql = `
          UPDATE applicant_profiles
          SET
            full_name = ?,
            email = ?,
            phone = ?,
            skills = ?,
            experience = ?,
            education = ?,
            resume = COALESCE(?, resume)
          WHERE applicant_id = ?
        `;

        db.query(
          updateSql,
          [
            full_name,
            email,
            phone,
            skills,
            experience,
            education,
            resume,
            applicant_id,
          ],
          (err) => {

            if (err) return reject(err);

            resolve({
              success: true,
              message: "Profile Updated Successfully",
            });

          }
        );

      } else {

        const insertSql = `
          INSERT INTO applicant_profiles
          (
            applicant_id,
            full_name,
            email,
            phone,
            skills,
            experience,
            education,
            resume
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertSql,
          [
            applicant_id,
            full_name,
            email,
            phone,
            skills,
            experience,
            education,
            resume,
          ],
          (err) => {

            if (err) return reject(err);

            resolve({
              success: true,
              message: "Profile Saved Successfully",
            });

          }
        );

      }

    });

  });
};

// Get Profile
const getProfile = (applicantId) => {
  return new Promise((resolve, reject) => {

    const sql = `
      SELECT *
      FROM applicant_profiles
      WHERE applicant_id = ?
      LIMIT 1
    `;

    db.query(sql, [applicantId], (err, results) => {

      if (err) return reject(err);

      resolve({
        success: true,
        profile: results.length > 0 ? results[0] : null,
      });

    });

  });
};

module.exports = {
  saveProfile,
  getProfile,
};