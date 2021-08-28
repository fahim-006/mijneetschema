var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mealsSchema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    quantity: [],
    price: { type: Number, required: true },
    meal_img: { type: String, default: "abc.jpg" },
    added_by: { type: String, required: true },
    food_source: [{type: mongoose.Schema.ObjectId, ref: "Ingredients"}],
    ingredient: [{ type: mongoose.Schema.ObjectId, ref: "Ingredients" }],
    category_id: { type: mongoose.Schema.ObjectId, ref: "MealCategory" },
    nutrition: { type: String },
    rating: { type: Number, default: 0 },
    ingredient_price: Array,
    created_at: Date,
    updated_at: Date,
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "meals" }
);

var Meals = mongoose.model("Meals", mealsSchema);

module.exports = Meals;
