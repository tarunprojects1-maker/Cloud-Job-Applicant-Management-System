const profileService = require("../services/profileService");

const saveProfile = async (req, res) => {
  try {

    const result = await profileService.saveProfile(req.body);

    res.status(201).json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getProfile = async (req, res) => {
  try {

    const applicantId = req.params.applicantId;

    const result = await profileService.getProfile(applicantId);

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
  saveProfile,
  getProfile,
};