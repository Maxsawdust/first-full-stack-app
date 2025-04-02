require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");

// Import the routes
const carRoutes = require("./routes/carRoutes.js");

// DB username and password stored in .env file.
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Using mongoose to connect to my Atlas cluster.
// Please replace the username and password with your own credentials.
mongoose
  .connect(
    `mongodb+srv://${USERNAME}:${PASSWORD}@my-first-cluster.wrc3i27.mongodb.net/?retryWrites=true&w=majority&appName=My-first-cluster`
  )
  // Message displayed if connection is successful.
  .then(() => console.log("Connected to MongoDB"))
  // Message displayed if connection fails.
  .catch((err) => console.error("Error connecting to MongoDB", err.message));

// Middleware to parse JSON data from incoming requests
app.use(express.json());
// Middleware to parse URL-encoded data from incoming requests
app.use(express.urlencoded({ extended: true }));

// Set up routes to be handles from http://localhost:3000/cars
app.use("/cars", carRoutes);

// PORT variable stored in .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port " + PORT));
