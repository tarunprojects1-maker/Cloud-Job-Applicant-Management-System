const adminService = require("../services/adminService");

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await adminService.loginAdmin(email, password);

    if (!result.success) {
      return res.status(401).json(result);
    }

    res.json(result);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const result = await adminService.changePassword(adminId, password);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const forgotPassword = async (req, res) => {
  try {

    const { email, password } = req.body;

    const result = await adminService.forgotPassword(email, password);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const result = await adminService.getDashboardStats();

    res.json(result);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Get All Applicants
const getAllApplicants = async (req, res) => {
  try {

    const result = await adminService.getAllApplicants();

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// Get One Applicant
const getApplicantById = async (req, res) => {

  try {

    const { id } = req.params;

    const result = await adminService.getApplicantById(id);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};

// Recent Applications
const getRecentApplications = async (req, res) => {

  try {

    const result = await adminService.getRecentApplications();

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

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