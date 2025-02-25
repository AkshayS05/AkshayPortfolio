const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "SECRET_KEY";
const Session = require("../models/Session");
const crypto = require("crypto");
const { saveSession, deleteSession } = require("../helpers/sessionCache");
const {
  sendVerificationEmail,
  sendVerificationCode,
} = require("../helpers/sendVerificationEmail");

//verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; // e.g., /verify-email?token=xxx
    if (!token) return res.status(400).send("Missing token");

    // Find the user by the verification token stored in the database
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).send("Invalid or expired token");

    // Mark user as verified
    user.verified = true;
    user.verificationToken = null;
    await user.save();

    // Automatically redirect the user to the login page (or any desired page)
    return res.redirect(`${process.env.CLIENT_BASE_URL}/login?verified=true`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide name, email, and password." });
    }

    let user = await User.findOne({ email });
    if (user) {
      // If user exists but not verified, update the token and resend verification
      if (!user.verified) {
        const verificationToken = crypto.randomBytes(32).toString("hex");
        user.verificationToken = verificationToken;
        await user.save();
        const verifyLink = `${process.env.API_URL}/api/auth/verify-email?token=${verificationToken}`;
        await sendVerificationEmail(email, verifyLink);
        return res.status(200).json({
          message:
            "Your account is pending verification. A new verification email has been sent.",
        });
      } else {
        return res.status(400).json({ error: "User already exists" });
      }
    }

    // Create new user record with verified: false
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationToken,
      createdAt: new Date(),
    });

    const verifyLink = `${process.env.API_URL}/api/auth/verify-email?token=${verificationToken}`;
    await sendVerificationEmail(email, verifyLink);

    return res.status(200).json({
      message:
        "Verification email sent. Please check your inbox to verify your account.",
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// 🔹 Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    // 🔹 Check verified status
    if (!user.verified) {
      return res.status(400).json({ error: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      jwtSecret,
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
    const decoded = jwt.verify(token, jwtSecret);
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
      secure: true, // Match your login settings
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
      secure: true, // This should match what was used when setting the cookie
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
      secure: true,
      sameSite: "none",
    });
    return res.status(200).json({
      success: true,
      message: "Logged out (token invalid)",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
  verifyEmail,
};
