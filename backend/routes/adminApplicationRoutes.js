const express = require("express");

const router = express.Router();

const {
  getAllApplications,
  updateApplicationStatus,
} = require("../controllers/adminApplicationController");

router.get("/", getAllApplications);

router.put("/status", updateApplicationStatus);

module.exports = router;