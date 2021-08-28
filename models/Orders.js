var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema(
{
  order_id: { type: Number, required: true,unique: true },
  payment_id: { type: String, required: true},
  user_id: { type: mongoose.Schema.ObjectId,
    ref: 'User', required:true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: String, required: true },
  address:{type: String },
  state:{type: String },
  city:{type: String },
  landmark:String,
  pincode:String,
  alternate_contact_no: String,
  total: { type: Number, required: true },
  amount_without_tax: { type: Number, default: 0 },
  amount_with_tax: { type: Number, default: 0 },
  coupon_code:{type:String,default:""},
  discountPercentage:{type:Number,default:0},
  isUserRemovedOrder:{type:Boolean,default:false},
  created_at: Date,
  updated_at: Date
},{ collection:'orders'});

var Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;

