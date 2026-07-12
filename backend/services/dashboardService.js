const db = require("../config/db");

const getDashboardStats = (applicantId) => {
  return new Promise((resolve, reject) => {

    const stats = {};

    db.query(
      "SELECT COUNT(*) AS totalJobs FROM jobs",
      (err, jobsResult) => {

        if (err) return reject(err);

        stats.availableJobs = jobsResult[0].totalJobs;

        db.query(
          "SELECT COUNT(*) AS appliedJobs FROM applications WHERE applicant_id=?",
          [applicantId],
          (err, appliedResult) => {

            if (err) return reject(err);

            stats.appliedJobs = appliedResult[0].appliedJobs;

            db.query(
              "SELECT COUNT(*) AS pending FROM applications WHERE applicant_id=? AND LOWER(status)='pending'",
              [applicantId],
              (err, pendingResult) => {

                if (err) return reject(err);

                stats.pending = pendingResult[0].pending;

                db.query(
                  "SELECT COUNT(*) AS accepted FROM applications WHERE applicant_id=? AND LOWER(status)='accepted'",
                  [applicantId],
                  (err, acceptedResult) => {

                    if (err) return reject(err);

                    stats.accepted = acceptedResult[0].accepted;

                    db.query(
                      "SELECT COUNT(*) AS rejected FROM applications WHERE applicant_id=? AND LOWER(status)='rejected'",
                      [applicantId],
                      (err, rejectedResult) => {

                        if (err) return reject(err);

                        stats.rejected = rejectedResult[0].rejected;

                        db.query(
                          "SELECT COUNT(*) AS shortlisted FROM applications WHERE applicant_id=? AND LOWER(status)='shortlisted'",
                          [applicantId],
                          (err, shortlistResult) => {

                            if (err) return reject(err);

                            stats.shortlisted =
                              shortlistResult[0].shortlisted;

                            resolve({
                              success: true,
                              stats
                            });

                          }
                        );

                      }
                    );

                  }
                );

              }
            );

          }
        );

      }
    );

  });
};

module.exports = {
  getDashboardStats
};