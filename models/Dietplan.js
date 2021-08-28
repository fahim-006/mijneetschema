var mongoose = require('mongoose');
const { strict } = require('assert');
var Schema = mongoose.Schema;

var dietplanSchema = new Schema(
{
  user_id: { type: String },
  email :{type: String},
  method_name: { type: String, required: true },
  r1: { type: String ,default:""},
  r2: { type: String ,default:""},
  r3: { type: String ,default:""},
  r4: { type: String ,default:""},
  r5: { type: String ,default:""},
  r6: { type: String ,default:""},
  r7: { type: String ,default:""},
  r8: { type: String ,default:""},
  created_at: Date,
  updated_at: Date
},{ collection:'dietplan'});

var Dietplan = mongoose.model('Dietplan', dietplanSchema);

module.exports = Dietplan;

