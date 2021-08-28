var mongoose = require("mongoose");
const { strict } = require("assert");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: { type: String, required: false, unique: true },
    password: { type: String },
    fullname: { type: String, required: true },
    token: { type: String, required: false },
    mobile_number: { type: String, required: false, default: "" },
    role: Number,
    status: Number,
    verification_code: String,
    password_reset_code: String,
    payment_status: { type: Boolean, default: false },
    payment_id: String,
    payment_amount: String,
    plan_name: String,
    address: String,
    latitude: Number,
    longitude: Number,
    job_role: String,
    start_date: Date,
    category_id: { type: mongoose.Schema.ObjectId, ref: "TrainerCategory" },
    bio: String,
    end_date: Date,
    profile_img:  [],
    created_at: Date,
    updated_at: Date,
    isDeleted: { type: Boolean, default: false },
    socketId: String
  },
  { collection: "users" }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
