const db = require("../config/db");

// Register Applicant
const registerApplicant = (user, callback) => {

    const sql = `
        INSERT INTO applicants
        (full_name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.full_name,
            user.email,
            user.password
        ],
        callback
    );

};

// Find Applicant by Email
const findApplicantByEmail = (email, callback) => {

    const sql = `
        SELECT * FROM applicants
        WHERE email = ?
    `;

    db.query(sql, [email], callback);

};

module.exports = {
    registerApplicant,
    findApplicantByEmail
};