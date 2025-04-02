const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars.controller.js");

// assigning middleware function for neatness' sake
const getCarById = carsController.getCar;

// Add a car to the collection
router.post("/", carsController.createCar);

// Update information about one car
router.patch("/:id", getCarById, carsController.updateOneCar);

// udpate information for more than one car.

// Delete a specific document
// passing in middleware to get the car by id
router.delete("/:id", getCarById, carsController.deleteCar);

// List all the information for all cars in the DB
router.get("/", carsController.getCars);

// list the information for all cars older than 5 years
router.get("/old", carsController.getOlderCars);

module.exports = router;
