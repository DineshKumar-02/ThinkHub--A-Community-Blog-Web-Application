const express = require("express");
const router  = express.Router();
const Post    = require("../models/Post");
const User    = require("../models/User");

router.post("/add", async (req, res) => {
  const { title, desc, topic, username } = req.body;
  try {
    const post = new Post({ title, desc, topic, username });
    await post.save();
    
    // Find owner's full name to attach to response
    const postObj = post.toObject();
    const user = await User.findOne({ username });
    postObj.name = user ? user.name : "Anonymous";
    
    res.json({ success: true, post: postObj });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 }).limit(20).lean();
    
    // Populate user names
    const usernames = [...new Set(posts.map(p => p.username).filter(Boolean))];
    const users = await User.find({ username: { $in: usernames } });
    const userMap = {};
    users.forEach(u => {
      userMap[u.username] = u.name;
    });
    posts.forEach(p => {
      p.name = userMap[p.username] || "Anonymous";
    });
    
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/:topic", async (req, res) => {
  try {
    const posts = await Post.find({ topic: req.params.topic }).sort({ created_at: -1 }).lean();
    
    // Populate user names
    const usernames = [...new Set(posts.map(p => p.username).filter(Boolean))];
    const users = await User.find({ username: { $in: usernames } });
    const userMap = {};
    users.forEach(u => {
      userMap[u.username] = u.name;
    });
    posts.forEach(p => {
      p.name = userMap[p.username] || "Anonymous";
    });
    
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/by-user/:username", async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.username }).sort({ created_at: -1 }).lean();
    const user = await User.findOne({ username: req.params.username });
    const name = user ? user.name : "Anonymous";
    posts.forEach(p => {
      p.name = name;
    });
    res.json(posts);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ success: false, error: "Post not found" });
    }
    
    const requestUsername = req.query.username;
    if (!requestUsername || !post.username || post.username !== requestUsername) {
      return res.json({ success: false, error: "You are not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router;

