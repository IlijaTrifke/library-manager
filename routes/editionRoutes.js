const express = require("express");
const {
  createEdition,
  getAllEditions,
} = require("../controllers/editionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("").post(protect, createEdition).get(getAllEditions);

module.exports = router;
