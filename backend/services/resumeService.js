const db = require("../config/db");

const saveResume = (applicantId, resumeFile) => {

    return new Promise((resolve, reject) => {

        const sql =
            "UPDATE applicant_profiles SET resume=? WHERE applicant_id=?";

        db.query(
            sql,
            [resumeFile, applicantId],
            (err, result) => {

                if (err) return reject(err);

                resolve({
                    success: true,
                    message: "Resume Uploaded Successfully"
                });

            }
        );

    });

};

module.exports = {
    saveResume
};