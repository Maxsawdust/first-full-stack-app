const Car = require("../models/Car.model");

exports.createCar = async (req, res) => {
  // create a Car with the request body
  const newCar = new Car({ ...req.body });
  try {
    // save the car to DB
    await newCar.save();

    // send the response status and message
    // status 201 for successfully creating something
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateOneCar = async (req, res) => {
  try {
    // updating the car with the req.body
    /* need to use Object.keys like this in order to keep the original mongoose 
       document and then use save() */
    Object.keys(req.body).forEach((key) => {
      // throwing error if the user has entered a property that doesn't exist on the car
      if (!res.car[key]) {
        throw new Error(`cannot update invalid property ${key}`);
      }
      // throwing error if user tries to edit creationDate
      if (key === "creationDate") {
        throw new Error("cannot update creationDate property");
      }

      res.car[key] = req.body[key];
    });
    const updatedCar = await res.car.save();
    res.send(updatedCar);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateManyCars = async (req, res) => {};

exports.deleteCar = async (req, res) => {
  try {
    const carToDelete = res.car;
    // Using middleware to get car, removing the car from DB
    await Car.deleteOne({ _id: carToDelete._id });
    res.send("Deleted car.");
  } catch (err) {
    /* sending 500, internal error, because the middleware handles the 404 if
       the car doesn't exist */
    res.status(500).send(err.message);
  }
};

exports.getCars = async (req, res) => {
  try {
    // using.find() to display all the cars
    const cars = await Car.find();
    // sending the cars
    res.send(cars);
  } catch (err) {
    // sending 500 internal error code if this fails
    res.status(500).send(err.message);
  }
};

// middleware that takes an id to get a car
// not necessary, but handles errors nicely
exports.getCarById = async (req, res, next) => {
  // initialising car variable in local scope
  let car;
  try {
    // using req.params to get the car by id
    car = await Car.findById(req.params.id);
    // sending a 404 not found error if there's no car
    if (car === null) {
      return res.status(404).send("Cannot find car.");
    }
  } catch (err) {
    // sending a 500 internal error otherwise
    return res.status(500).send(err.message);
  }

  // creating car variable on the response object
  res.car = car;
  next();
};

exports.getOlderCars = async (req, res) => {
  try {
    const oldCars = await Car.where("year").lt(2020);
    res.send(oldCars);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
