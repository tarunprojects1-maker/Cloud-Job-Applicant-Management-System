const photoService = require("../services/photoService");

const uploadPhoto = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const applicantId = req.body.applicant_id;

    const result = await photoService.savePhoto(
      applicantId,
      req.file.filename
    );

    res.status(200).json(result);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  uploadPhoto,
};