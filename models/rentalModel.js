const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    edition: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Edition",
    },
    client: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Client",
    },
  },
  { timestamps: true }
);

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
