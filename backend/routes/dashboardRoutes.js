const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

// Get Dashboard Statistics
router.get("/stats/:applicantId", getDashboardStats);

module.exports = router;