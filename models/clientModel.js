const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: "string",
    requited: true,
  },
  rentedEditions: {
    type: [mongoose.Types.ObjectId],
    ref: "Edition",
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
