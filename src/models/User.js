const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
