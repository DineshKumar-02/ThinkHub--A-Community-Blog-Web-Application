const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title:      String,
  desc:       String,
  topic:      { type: String, index: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema); 