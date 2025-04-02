const mongoose = require("mongoose");

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

const carSchema = mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  owners: {
    type: [ownerSchema],
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = mongoose.model("Car", carSchema);
