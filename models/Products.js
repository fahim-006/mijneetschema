var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema(
{
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true},
  description: { type: String, required: true },
  price: { type: String, required: true },
  product_img:{type: String, default: 'abc.jpg'},
  category_id: { type: mongoose.Schema.ObjectId,
    ref: 'Category', required:true },
  added_by: { type: String, required: true },
  rating:{type: Number, default: 0},
  featured: { type: Boolean, default: false },
  created_at: Date,
  updated_at: Date,
  isDeleted:{type:Boolean,default:false}
},{ collection:'products'});

var Product = mongoose.model('Products', productSchema);

module.exports = Product;

