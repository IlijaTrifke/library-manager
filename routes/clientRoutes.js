const express = require("express");
const {
  createClient,
  getAllClients,
  getClientById,
} = require("../controllers/clientController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("").post(protect, createClient).get(protect, getAllClients);
// router.route("/neka-nasa-rec") pravilan redosled zbog preklapanja
router.route("/:id").get(protect, getClientById);

module.exports = router;
