const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validation
    if (!name || !email || !age) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (age < 13) {
      return res.status(400).json({ error: "Must be 13+" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create user
    const user = new User({ name, email, age });
    await user.save();

    // Return user data
    return res.status(201).json({ 
      message: "Signup successful",
      user: user 
    });

  } catch (err) {
    console.log("Signup Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;