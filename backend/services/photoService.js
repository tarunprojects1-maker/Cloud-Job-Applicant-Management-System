const db = require("../config/db");

const savePhoto = (applicantId, photoFile) => {

  return new Promise((resolve, reject) => {

    const sql =
      "UPDATE applicant_profiles SET profile_photo=? WHERE applicant_id=?";

    db.query(
      sql,
      [photoFile, applicantId],
      (err) => {

        if (err) return reject(err);

        resolve({
          success: true,
          message: "Profile Photo Uploaded Successfully",
        });

      }
    );

  });

};

module.exports = {
  savePhoto,
};