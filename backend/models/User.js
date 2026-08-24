const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name:  String,
  email: { type: String, unique: true, index: true },
  age:   Number,
  username: { type: String, unique: true, index: true, sparse: true }
});

module.exports = mongoose.model("User", UserSchema);

