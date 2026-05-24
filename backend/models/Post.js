const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title:      String,
  desc:       String,
  topic:      String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema); 