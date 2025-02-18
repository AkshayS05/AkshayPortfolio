const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const { getSession } = require("./sessionCache");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");
    const userId = decoded.id;

    let cachedToken = getSession(userId);
    if (!cachedToken) {
      //check in mongodb
      const session = await Session.findOne({ userId, token });
      if (!session) {
        return res.status(401).json({ error: "Unauthorized: Invalid session" });
      }
      cachedToken = session.token;
    }
    // Compare the token from the cache/DB with the token provided
    if (cachedToken !== token) {
      return res.status(401).json({ error: "Unauthorized: Token mismatch" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid token", details: error.message });
  }
};

module.exports = authMiddleware;
