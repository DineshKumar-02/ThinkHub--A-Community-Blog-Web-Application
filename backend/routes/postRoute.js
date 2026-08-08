const express = require("express");
const router  = express.Router();
const Post    = require("../models/Post");

router.post("/add", async (req, res) => {
  const { title, desc, topic } = req.body;
  try {
    const post = new Post({ title, desc, topic });
    await post.save();
    res.json({ success: true, post });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.get("/:topic", async (req, res) => {
  try {
    const posts = await Post.find({ topic: req.params.topic });
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;

