const express = require("express");
const router = express.Router();

const {
  loginAdmin,
  changePassword,
  forgotPassword,
  getDashboardStats,
  getRecentApplications,
  getAllApplicants,
  getApplicantById,
} = require("../controllers/adminController");

// Admin Login
router.post("/login", loginAdmin);

router.put("/change-password", changePassword);

router.put("/forgot-password", forgotPassword);

// Dashboard Statistics
router.get("/dashboard", getDashboardStats);

router.get("/recent-applications", getRecentApplications);

// View All Applicants
router.get("/applicants", getAllApplicants);

router.get("/applicants/:id", getApplicantById);

module.exports = router;