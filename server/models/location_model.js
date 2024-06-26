const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  mapname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 25,
  },
  location: [
    {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
