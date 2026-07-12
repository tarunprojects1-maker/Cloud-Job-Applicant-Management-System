const express = require("express");
const router = express.Router();

const {
    registerApplicant,
    loginApplicant
} = require("../controllers/applicantController");

router.post("/register", registerApplicant);
router.post("/login", loginApplicant);

module.exports = router;