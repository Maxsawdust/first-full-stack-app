const mongoose = require("mongoose");
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
      // storing the owners in a variable
      const owners = req.car.owners;

      // throwing error if the user has entered a property that doesn't exist on the car
      if (!req.car[key]) {
        throw new Error(`cannot update invalid property ${key}`);
      }
      // throwing error if user tries to edit creationDate
      // unnecessary, but helpful to user
      if (key === "creationDate") {
        throw new Error("cannot update creationDate property");
      }

      // if the user is trying to update the owners
      if (key === "owners") {
        // check if any new owner has "isCurrent: true"
        const newCurrentOwner = req.body.owners.find(
          (owner) => owner.isCurrent === true
        );

        // if there's a new current owner
        if (newCurrentOwner) {
          // set the old owners isCurrent value to false
          req.car.owners.forEach((owner) => (owner.isCurrent = false));
        }

        req.car[key] = req.body[key];
      } else {
        req.car[key] = req.body[key];
      }
    });
    const updatedCar = await req.car.save();
    res.send(updatedCar);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/* NOTE: I'm not using Car.udpateMany() here, because it does not run through 
   Mongoose's validation. Nor does it trigger my pre("save") middleware hook. */
exports.updateManyCars = async (req, res) => {
  try {
    // get the make and model from query
    const { make, model } = req.query;

    // finding all the cars that match the query
    const carsToUpdate = await Car.find({ make: make, model: model });

    // if no cars found, throw 404 err
    if (carsToUpdate.length === 0) {
      return res.status(404).send("No cars matching query found.");
    }

    // retrieving the key of the prop to update from req.body
    // there will only be one key here.
    const key = Object.keys(req.body)[0];
    // creating empty updated cars array to send later
    const updatedCars = [];

    // generating a new _id so that if the user adds a new owner, they have the same _id for each car they own.
    const new_id = new mongoose.Types.ObjectId();
    // iterate through the cars
    for (let car of carsToUpdate) {
      // if the user is trying to update the owners
      if (key === "owners") {
        // create variable for new owner
        const newOwner = req.body[key][0];
        newOwner._id = new_id;

        // check if any new owner has "isCurrent: true"
        const newCurrentOwner = newOwner.isCurrent === true && true;

        // if there's a new current owner
        if (newCurrentOwner) {
          // set all other owners to isCurrent: false
          car.owners.forEach((owner) => (owner.isCurrent = false));
        }

        // push the new owner to the car's owners array.
        car.owners.push(newOwner);
      }
      // if the key isn't owners, then it'll be price, and it can just be updated like so.
      car.price = req.body.price;

      // save the car
      const savedCar = await car.save();
      updatedCars.push(savedCar);
    }

    res.send(updatedCars);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const carToDelete = req.car;
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
  req.car = car;
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
