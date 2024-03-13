const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// Routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const editionRoutes = require("./routes/editionRoutes");
const clientRoutes = require("./routes/clientRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Api is running...");
});
// /books  /api/v1/books
// routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/editions", editionRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/rentals", rentalRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
