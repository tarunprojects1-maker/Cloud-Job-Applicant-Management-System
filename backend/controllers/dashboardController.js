const dashboardService = require("../services/dashboardService");

const getDashboardStats = async (req, res) => {
  try {

    const applicantId = req.params.applicantId;

    const result = await dashboardService.getDashboardStats(applicantId);

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
  getDashboardStats,
};