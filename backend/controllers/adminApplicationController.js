const adminApplicationService = require("../services/adminApplicationService");

// View Applications
const getAllApplications = async (req, res) => {
  try {

    const result =
      await adminApplicationService.getAllApplications();

    res.json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Accept / Reject
const updateApplicationStatus = async (req, res) => {
  try {

    const { id, status } = req.body;

    const result =
      await adminApplicationService.updateApplicationStatus(
        id,
        status
      );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getAllApplications,
  updateApplicationStatus,
};