var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var couponsSchema = new Schema(
{
  coupon: { type: String, required: true },
  discount: { type: String, required:true },
  expiry_date: Date,
  created_at: Date,
  updated_at: Date
},{ collection:'coupons'});

var Coupons = mongoose.model('coupons', couponsSchema);

module.exports = Coupons;

