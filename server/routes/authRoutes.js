const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../controllers/AuthController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "No user data" });
  }
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "user is authenticated",
    user,
  });
});
module.exports = router;
