const mongoose = require("mongoose");

const gameMapSchema = new mongoose.Schema({
  room: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 25,
  },
  roundtime: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 5,
  },
  hasStarted: Boolean,
  isCompleted: Boolean,
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  // createdAt: { type: Date, expires: 6400, default: Date.now },
});

// gameMapSchema.index({ createdAt: 1 }, { expireAfterSeconds: 6400 });

const GameMap = mongoose.model("GameMap", gameMapSchema);

module.exports = GameMap;
