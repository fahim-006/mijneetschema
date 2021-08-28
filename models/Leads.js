var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var calculatorSchema = new Schema(
  {
    gender: { type: String, required: true },
    target: { type: String, required: true },
    physical_activity: { type: String, required: true },
    meat_products: { type: Object, required: true },
    vegetables: { type: Object, required: true },
    fruits: { type: Object, required: true },
    other_products: { type: Object, required: true },
    allergies_intolerances: { type: Object, required: true },
    personal_mesurement: { type: Object, required: true },
    created_at: Date,
    updated_at: Date,
  },
  { collection: "leads" }
);

var Product = mongoose.model("Lead", calculatorSchema);

module.exports = Product;
