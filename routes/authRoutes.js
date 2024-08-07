const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  register,
  login,
  getUserInfo,
} = require("../controllers/AuthorizationController");

const router = express.Router();

router.post("/register", register);
router.get("/login", login);
router.get("/user-info", authenticateToken, getUserInfo);

module.exports = router;
