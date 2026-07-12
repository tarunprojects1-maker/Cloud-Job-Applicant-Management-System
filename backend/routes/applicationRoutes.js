const express = require("express");
const router = express.Router();

const {
    applyJob,
    getMyApplications
} = require("../controllers/applicationController");

// ✅ This route already exists and is correct
router.post("/apply", applyJob);  // POST /api/applications/apply

// Get all applications of one applicant
router.get("/my/:applicantId", getMyApplications);

module.exports = router;