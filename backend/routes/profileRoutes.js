const express = require("express");

const router = express.Router();

const {
    saveProfile,
    getProfile
} = require("../controllers/profileController");

router.post("/save", saveProfile);

router.get("/:applicantId", getProfile);

module.exports = router;