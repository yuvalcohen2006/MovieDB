const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
    trim: true,
  },
  Year: {
    type: Number,
    required: true,
  },
  Director: {
    type: String,
    required: true,
    trim: true,
  },
  WatchedAt: {
    type: Date,
  },
  // MICHAL: צריך להיות ערך מינימלי ומקסימלי
  Rating: {
    type: Number,
    required: true,
  },
  Rated: {
    type: String,
    required: true,
    trim: true,
  },
  Released: {
    type: Date,
    required: true,
    trim: true,
  },
  // MICHAL: חלק מהסרטים שייכים לכמה ג'אנרים. עדיף לשמור במערך כדי לאפשר חיפוש גמיש יותר.
  Genre: {
    type: String,
    required: true,
    trim: true,
  },
});

movieSchema.virtual("actors", {
  ref: "Actor",
  localField: "_id",
  foreignField: "Movies",
});

movieSchema.set("toJSON", { virtuals: true });
movieSchema.set("toObject", { virtuals: true });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
