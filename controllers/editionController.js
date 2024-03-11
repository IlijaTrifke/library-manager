const Book = require("../models/bookModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Edition = require("../models/editionModel.js");

// @desc    Create a book edition
// @route   POST /api/editions
// @access  Private

const createEdition = asyncHandler(async (req, res) => {
  const { bookId, yearOfRelease, cover, isbn, numberOfPages, inStock } =
    req.body;
  const edition = new Edition({
    book: bookId,
    yearOfRelease,
    cover,
    isbn,
    numberOfPages,
    inStock,
  });

  const book = await Book.findById(bookId);
  book.editions = [...book.editions, edition._id];

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      await edition.save({ session });
      await book.save({ session });
      res.status(201).json(edition);
    });
  } catch (error) {
    throw error;
  } finally {
    await session.endSession();
  }
});

module.exports = { createEdition };
