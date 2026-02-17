const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
    trim: true,
  },
  Height: {
    type: Number,
    required: true,
  },
  IsAlive: {
    type: Boolean,
    required: true,
  },
  Movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const Actor = mongoose.model("Actor", actorSchema);

module.exports = Actor;
