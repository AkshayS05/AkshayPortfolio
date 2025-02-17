const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  testimonial: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rating", RatingSchema);
