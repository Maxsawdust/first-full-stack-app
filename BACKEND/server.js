require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const mongoose = require("mongoose");

// Import the routes
const carRoutes = require("./routes/carRoutes.js");

// DB URI stored in .env
const MONGO_URI = process.env.MONGO_URI;

// Using mongoose to connect to my Atlas cluster.
mongoose
  .connect(MONGO_URI)
  // Message displayed if connection is successful.
  .then(() => console.log("Connected to MongoDB"))
  // Message displayed if connection fails.
  .catch((err) => {
    console.error("Error connecting to MongoDB", err.message);
    process.exit(1);
  });
// Enabling CORS for all routes
app.use(cors());

// Middleware to parse JSON data from incoming requests
app.use(express.json());
// Middleware to parse URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: true }));

// Set up routes to be handles from http://localhost:5000/cars
app.use("/cars", carRoutes);

// PORT variable stored in .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
