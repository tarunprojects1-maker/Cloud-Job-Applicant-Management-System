    const db = require("../config/db");

    const getJobs = (req, res) => {
        db.query("SELECT * FROM jobs", (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                jobs: results
            });
        });
    };

    module.exports = {
        getJobs
    };