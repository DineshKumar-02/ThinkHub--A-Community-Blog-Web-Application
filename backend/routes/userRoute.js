const express = require("express");
const router  = express.Router();
const User    = require("../models/User");

router.post("/signup", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const user = new User({ name, email, age });
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

module.exports = router; 