const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, "SECRET_KEY");
//     console.log("Decoded token:", decoded);
//     req.user = { id: decoded.id, role: decoded.role, email: decoded.email };
//     next();
//   } catch (error) {
//     console.error("JWT verification error:", error);
//     return res
//       .status(401)
//       .json({ error: "Unauthorized: Invalid token", details: error.message });
//   }
// };

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    console.log("Decoded token:", decoded);
    req.user = { id: decoded.id, role: decoded.role, email: decoded.email };
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid token", details: error.message });
  }
};

module.exports = authMiddleware;
