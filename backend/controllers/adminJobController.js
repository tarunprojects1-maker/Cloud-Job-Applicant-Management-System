const adminJobService = require("../services/adminJobService");

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {

    const result = await adminJobService.getAllJobs();

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// Add Job
const addJob = async (req, res) => {
  try {

    const jobData = {
      ...req.body,
      job_pdf: req.file ? req.file.filename : null,
    };

    const result = await adminJobService.addJob(jobData);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await adminJobService.deleteJob(id);

    res.json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// Update Job
const updateJob = async (req, res) => {
  try {

    const { id } = req.params;

    const jobData = {
      ...req.body,
      job_pdf: req.file ? req.file.filename : null,
    };

    const result = await adminJobService.updateJob(id, jobData);

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
  getAllJobs,
  addJob,
  updateJob,
  deleteJob,
};