const authService = require("../services/authService");

// Register
const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        res.status(201).json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Login
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await authService.login(email, password);

        if (!result.success) {
            return res.status(401).json(result);
        }

        res.json(result);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    register,
    login
};