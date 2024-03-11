const express = require("express");
const { createEdition } = require("../controllers/editionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("").post(protect, createEdition);

module.exports = router;
