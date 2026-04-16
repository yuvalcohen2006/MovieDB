const mongoose = require("mongoose");

const actorSchema = mongoose.Schema({
  // MICHAL: למה הכל מתחיל באות גדולה?
  Name: {
    // MICHAL: צריך להיות unique, אין לך שום דבר אחר בלי כפילויות
    type: String,
    required: true,
    trim: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  // MICHAL: מתאים כאן enum
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
