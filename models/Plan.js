var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planSchema = new Schema(
{
  name: { type: String, required: true },
  description: { type: String, required:true },
  price: { type: String, required:true },
  expiry_date: Date,
  created_at: Date,
  updated_at: Date
});

var Plans = mongoose.model('Plan', planSchema);

module.exports = Plans;

