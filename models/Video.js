var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema(
{
  video_type: { type: String, required: true },
  video_url: { type: String},
  video: { type: String },
  added_by: { type: String, required: true },
  created_at: Date,
  updated_at: Date,
  isDeleted:{type:Boolean,default:false}
},{ collection:'video'});

var Video = mongoose.model('video', videoSchema);

module.exports = Video;

