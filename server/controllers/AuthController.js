const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "SECRET_KEY";
// 🔹 Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ name, email, password: hashPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// 🔹 Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", email, password);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );
    console.log("Generated token:", token);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged in successfully",
        user: { email: user.email, role: user.role, id: user._id },
      });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

//auth middleware
// Example
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    // Optionally fetch the full user from DB here if you only store user ID in the token
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
