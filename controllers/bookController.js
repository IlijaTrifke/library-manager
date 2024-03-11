const asyncHandler = require("express-async-handler");

const Book = require("../models/bookModel");

// @desc    Get all books from DB
// @route   GET /books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).populate("editions");
  res.json(books);
});

// @desc    Create a book
// @route   POST /books
// @access  Public
const createBook = asyncHandler(async (req, res) => {
  const { title, genre, authors, yearOfRelease, description } = req.body;

  const book = new Book({
    title,
    genre,
    authors,
    yearOfRelease,
    description,
  });
  const newBook = await book.save();

  res.status(201);
  res.json(newBook);
});

// @desc    Delete a book by ID
// @route   DELETE /books/:id
// @access  Public
const deleteBook = asyncHandler(async (req, res) => {
  // Trazimo u bazi knjigu sa tim ID-jem
  const book = await Book.findById(req.params.id);

  // Ako ne postoji, vracamo 404 Not Found
  if (!book) {
    res.status(404);
    throw new Error("The book with given ID does not exist.");
  }

  // Ako postoji, brisemo i vracamo taj objekat koji smo obrisali
  await Book.deleteOne({ _id: req.params.id });
  res.json(book);
});

module.exports = {
  getBooks,
  createBook,
  deleteBook,
};
