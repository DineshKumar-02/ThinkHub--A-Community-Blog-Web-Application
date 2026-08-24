const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try { 
    const { name, email, age, username } = req.body;

    // Validation
    if (!name || !email || !age || !username) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    if (age < 13) {
      return res.status(400).json({ success: false, error: "Must be 13+" });
    }

    if (username.length > 15) {
      return res.status(400).json({ success: false, error: "Username must be 15 characters or less" });
    }

    // Check if username or email already exists
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername || existingEmail) {
      // If both exist and belong to the same user, log them in successfully
      if (existingUsername && existingEmail && existingUsername._id.toString() === existingEmail._id.toString()) {
        return res.status(200).json({ 
          success: true, 
          message: "Login successful", 
          user: existingUsername 
        });
      }

      // If username exists but belongs to a different email
      if (existingUsername) {
        return res.status(400).json({ success: false, error: "already an message is there" });
      }

      // If email exists but belongs to a different username
      if (existingEmail) {
        return res.status(400).json({ success: false, error: "Email already exists" });
      }
    }

    // Create user
    const user = new User({ name, email, age, username });
    await user.save();

    // Return user data
    return res.status(201).json({ 
      success: true,
      message: "Signup successful",
      user: user 
    });

  } catch (err) {
    console.log("Signup Error:", err);
    return res.status(500).json({ success: false, error: err.message }); 
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User with this email not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });
  } catch (err) {
    console.log("Login Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

const Feedback = require("../models/Feedback");

router.post("/feedback", async (req, res) => {
  try {
    const { name, city, email, feedback } = req.body;
    if (!name || !city || !email || !feedback) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }
    const newFeedback = new Feedback({ name, city, email, feedback });
    await newFeedback.save();
    return res.status(201).json({ success: true, message: "Feedback submitted successfully" });
  } catch (err) {
    console.log("Feedback Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

