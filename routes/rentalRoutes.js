const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createRental } = require("../controllers/rentalController");

const router = express.Router();

router.route("").post(protect, createRental);

module.exports = router;
