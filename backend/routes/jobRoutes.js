const express = require("express");

const router = express.Router();

const jobController = require("../controllers/jobController");
const applicationController = require("../controllers/applicationController");

router.get("/", jobController.getJobs);

// Apply for a job
router.post("/:id/apply", applicationController.applyJob);

module.exports = router;