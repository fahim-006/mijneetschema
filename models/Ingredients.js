var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientsSchema = new Schema(
{
  source: {type: String, required: true},
  name: { type: String, required: true },
  protien: { type: Number, required: true},
  carbs: { type: Number, required: true},
  fat: { type: Number, required: true},
  fiber: Number,
  unit: { type: String, required: true},
  quantity: { type: Number, required: true},
  calories: { type: Number, required: true},
  added_by: { type: String, required: true },
  created_at: Date,
  isDeleted:{type:Boolean,default:false},
  updated_at: Date
},{ collection:'ingredients'});

var Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;

