const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name:  String,
  email: { type: String, unique: true, index: true },
  age:   Number
});

module.exports = mongoose.model("User", UserSchema);

