const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_id: Number,
    account: String,
    password: String,
    role: String,
    email: String,
    address: String,
    phone: Number,
    avatar: String,
  },
  {
    Timestamp: true,
  }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;

