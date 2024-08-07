const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/jwtConfig");
const User = require("../models/User");

// token authentication
const authenticateToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token is required." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user for ID and Check the expiration time of the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check the expiration time of the token
    if (user.expiredAt && new Date() > new Date(user.expiredAt)) {
      return res.status(401).json({ message: "Token has expired." });
    }

    // Add user to the request object
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token.", error: err.message });
  }
};

module.exports = authenticateToken;
