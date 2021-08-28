var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema(
{
  category: { type: String, required: true },
  description: { type: String, required: true },
  added_by: { type: String, required: true },
  category_img:{type: String, default: 'abc.jpg'},
  isDeleted:{type:Boolean,default:false},
  created_at: Date,
  updated_at: Date
},{ collection:'category'});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;

