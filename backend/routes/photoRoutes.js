const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    uploadPhoto
} = require("../controllers/photoController");

router.post(
    "/upload",
    upload.single("photo"),
    uploadPhoto
);

module.exports = router;