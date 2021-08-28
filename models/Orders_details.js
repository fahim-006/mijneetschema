var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ordersDetailsSchema = new Schema(
  {
    table_order_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Orders",
      required: true,
    },
    order_id: { type: Number, required: true },
    product_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel'
    },
    onModel: {
      type: String,
      required: true,
      enum: ['Meals', 'Products']
    },
    ingredient:[{type: Schema.Types.ObjectId,ref:'Ingredients'}],
    total: Number,
    created_at: Date,
    updated_at: Date,
  },
  { collection: "orders_details" }
);


var Orders_details = mongoose.model("Orders_details", ordersDetailsSchema);

module.exports = Orders_details;
