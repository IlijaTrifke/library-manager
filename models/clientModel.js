const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: "string",
    requited: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  isPremium: {
    type: "boolean",
    default: false,
  },
  membershipStart: {
    type: Date,
    required: true,
    default: Date.now,
  },
  memmbershipEnd: {
    type: Date,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
