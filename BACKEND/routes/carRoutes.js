const express = require("express");
const router = express.Router();
const carsController = require("../controllers/cars.controller.js");

// assigning middleware function for neatness' sake
const getCarById = carsController.getCarById;

// Add a car to the collection
router.post("/", carsController.createCar);

// List all the information for all cars in the DB
router.get("/", carsController.getCars);

// udpate information for more than one car.
router.patch("/", carsController.updateManyCars);

// list the information for all cars older than 5 years
router.get("/old", carsController.getOlderCars);

// Update information about one car
router.patch("/:id", getCarById, carsController.updateOneCar);

// Delete a specific document
// passing in middleware to get the car by id
router.delete("/:id", getCarById, carsController.deleteCar);

module.exports = router;
