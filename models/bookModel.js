const mongoose = require("mongoose");
const { Genre } = require("../enums/bookEnums");

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100,
  },
});

const bookSchema = mongoose.Schema({
  title: String,
  authors: [authorSchema],
  yearOfRelease: {
    type: Number,
    required: true,
  },
  ratings: [Number],
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    enum: [Genre.Thriller, Genre.SciFi, Genre.Fiction, Genre.Undefined],
    default: Genre.Undefined,
  },
  editions: {
    type: [mongoose.Types.ObjectId],
    ref: "Edition",
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
