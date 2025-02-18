const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "SECRET_KEY";
const Session = require("../models/Session");
const { saveSession, deleteSession } = require("../helpers/sessionCache");

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

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    // Save the session in the in-memory cache (using the user ID as key)

    saveSession(user._id.toString(), token);
    await Session.create({
      userId: user._id,
      token: token,
      expiresAt: expiresAt,
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
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
const logoutUser = async (req, res) => {
  const token = req.cookies.token;

  // If no token is found, clear any leftover cookie and respond success.
  if (!token) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Match your login settings
      sameSite: "none",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully (no token found)",
    });
  }

  try {
    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    const userId = decoded.id;

    // Remove the session from the in-memory cache (and optionally from the DB)
    deleteSession(userId);
    // If you're using persistent sessions, you could also do:
    await Session.deleteOne({ userId, token });

    // Clear the token cookie with matching options
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // This should match what was used when setting the cookie
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout token verification:", error);
    // Even if verification fails, clear the cookie to ensure logout
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out (token invalid)",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
