const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");
const addYears = require("../utils/addYears");
const validate = require("../middleware/validationMiddleware");
const { createSchema } = require("../validations/clientValidations");

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});
  res.json(clients);
});

// @desc    Get client by ID
// @route   GET /api/clients/:id dinamicki parametar
// @access  Private
const getClientById = asyncHandler(async (req, res) => {
  const clients = await Client.findById(req.params.id);
  res.json(clients);
});

// @desc    Create a client
// @route   POST /api/clients
// @access  Public
const createClient = [
  validate(createSchema),
  asyncHandler(async (req, res) => {
    const { name, isPremium, email, membershipStart, membershipDuration } =
      req.body;

    //1y or 6m
    const calculatedDuration = membershipDuration === "1y" ? 1 : 0.5;

    const client = new Client({
      name,
      isPremium,
      email,
      membershipStart,
      membershipEnd: membershipStart
        ? addYears(new Date(membershipStart), calculatedDuration)
        : addYears(new Date(), calculatedDuration),
    });

    await client.save();

    res.status(201).json(client);
  }),
];

module.exports = { createClient, getAllClients, getClientById };
