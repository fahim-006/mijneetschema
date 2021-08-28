var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificationSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    isRead: { type: Boolean, required: true, default: false },
    type: {type: Number, required: true,default:1, enum:[1,2],}, // 1=>normal req, 2=> Contact_request 
    status : {type:Number,required: true, default:1,enum:[1,2,3]}, //1=> pending, 2=> accepted, 3=> rejected this use in type 2 request
    created_at: Date
  },
  { collection: "notification" }
);

var Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
