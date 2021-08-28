var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wishlistSchema = new Schema(
{
  user_id: { type: String, required: true },
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
  // product_id: { type: mongoose.Schema.ObjectId,
  //   ref: 'Products', required:true },
  created_at: Date,
  updated_at: Date
},{ collection:'wishlist'});

var Wishlist = mongoose.model('wishlist', wishlistSchema);

module.exports = Wishlist;

