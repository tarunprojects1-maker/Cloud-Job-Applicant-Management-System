const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const Applicant = require("../models/applicantModel");


const register = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    return new Promise((resolve, reject) => {

        Applicant.registerApplicant(userData, (err, result) => {

            if (err) {
                return reject(err);
            }

            resolve({
                success: true,
                message: "Registration Successful"
            });

        });

    });

};

const login = async (email, password) => {

    return new Promise((resolve, reject) => {

        Applicant.findApplicantByEmail(email, async (err, result) => {

            if (err)
                return reject(err);

            if (result.length === 0) {
                return resolve({
                    success: false,
                    message: "User Not Found"
                });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return resolve({
                    success: false,
                    message: "Invalid Password"
                });
            }

            const token = generateToken(user);

            resolve({
    success: true,
    token,
    user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
    }
});

        });

    });

};

module.exports = {
    register,
    login
};