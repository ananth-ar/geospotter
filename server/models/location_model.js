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
  createdAt: { type: Date, expires: "1d", default: Date.now },
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
