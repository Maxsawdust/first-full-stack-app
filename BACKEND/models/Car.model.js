const mongoose = require("mongoose");

// creating an ownerSchema to define the structure of the owners property
const ownerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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

mongoose.model("Owner", ownerSchema);

// creating a carSchema for Car models
const carSchema = mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
    lowercase: true,
  },
  make: {
    type: String,
    required: true,
    lowercase: true,
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
    default: [],
  },
  currentOwner: {
    type: mongoose.SchemaTypes.ObjectId,
    default: function () {
      const currentOwner = this.owners?.find((owner) => owner.isCurrent);
      return currentOwner?._id || null;
    },
    lowercase: true,
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

// middleware that triggers before every document save
carSchema.pre("save", function (next) {
  // updating the updatedDate
  this.updatedDate = Date.now();

  // if an owner is added/changed, update current owner
  const currentOwner = this.owners?.find((owner) => owner.isCurrent);
  this.currentOwner = currentOwner?._id || null;
  next();
});

module.exports = mongoose.model("Car", carSchema);
