const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  room: {
    type: String,
    minlength: 1,
    maxlength: 25,
  },
  isAdmin: Boolean,
  isReady: Boolean,
  hasStarted: Boolean,
  points: Number,
  completed: Boolean,
  createdAt: { type: Date, expires: "1d", default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
