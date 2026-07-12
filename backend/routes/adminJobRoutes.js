const express = require("express");
const router = express.Router();

const uploadPDF = require("../middleware/jobPdfUpload");

const {
  getAllJobs,
  addJob,
  updateJob,
  deleteJob,
} = require("../controllers/adminJobController");

// Get All Jobs
router.get("/", getAllJobs);

// Add Job
router.post(
  "/",
  uploadPDF.single("job_pdf"),
  addJob
);

// Update Job
router.put(
  "/:id",
  uploadPDF.single("job_pdf"),
  updateJob
);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;