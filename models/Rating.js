var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ratingSchema = new Schema(
  {
    user_id: { 
      type: mongoose.Schema.ObjectId, 
      ref: "User", 
      required: true 
    },
    product_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ['Meals', 'Products','User']
    },
    rating: { type: Number, required: true },
    reviews: { type: String, required: true },
    created_at: Date,
    updated_at: Date,
  },
  { collection: "rating" }
);

var Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
