const asyncHandler = require("express-async-handler");
const validate = require("../middleware/validationMiddleware");
const { createSchema } = require("../validations/rentalValidations");
const Client = require("../models/clientModel");
const Edition = require("../models/editionModel");
const Rental = require("../models/rentalModel");
const mongoose = require("mongoose");

// @desc    Creates a rental
// @route   POST /api/rentals
// @access  Public
const createRental = [
  validate(createSchema),
  asyncHandler(async (req, res) => {
    const { clientId, editionId } = req.body;

    // Check if client and edition with given id exist
    const client = await Client.findById(clientId);
    const edition = await Edition.findById(editionId);
    if (!client) {
      res.status(404);
      throw new Error("Client with the given id does not exist");
    }
    if (!edition) {
      res.status(404);
      throw new Error("Edition with the given id does not exist");
    }

    // Are there copies left in stock
    if (edition.inStock === 0) {
      res.status(400);
      throw new Error("Edition with the given id is has no copies in stock");
    }

    const rental = new Rental({
      client: clientId,
      edition: editionId,
    });

    edition.inStock -= 1;
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await rental.save({ session });
        await edition.save({ session });
      });
    } catch (error) {
      throw error;
    } finally {
      await session.endSession();
    }
    res.status(201).json(rental);
  }),
];

module.exports = { createRental };
