const Applicant = require("../models/applicantModel");

const registerApplicant = (req, res) => {
    const applicant = {
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password
    };

    Applicant.registerApplicant(applicant, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Registration Failed",
                error: err
            });
        }

        res.status(201).json({
            message: "Applicant Registered Successfully!"
        });
    });
};



const loginApplicant = (req, res) => {

    const { email, password } = req.body;

    res.json({
        message: "Login API Working!"
    });

};

module.exports = {
    registerApplicant,
    loginApplicant
};