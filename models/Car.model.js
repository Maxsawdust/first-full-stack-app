const mongoose = require("mongoose");

// creating an ownerSchema to define the structure of the owners property
const ownerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    required: true,
  },
});

// creating a carSchema for Car models
const carSchema = mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  // registration is always uppercase
  registration: {
    type: String,
    required: true,
    uppercase: true,
  },
  // owners property is an array of objects that must follow the ownerSchema
  owners: {
    type: [ownerSchema],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // creationDate is immutable, and will default to the current date
  creationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  // updatedDate is designed to be the date at which the Car was updated
  updatedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// middleware that triggers before every document save, updating the updatedDate
carSchema.pre("save", function (next) {
  this.updatedDate = Date.now();
  next();
});

module.exports = mongoose.model("Car", carSchema);
