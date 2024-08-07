const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  service_id: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  review_date: { type: Date, default: Date.now },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
