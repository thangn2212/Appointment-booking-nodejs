const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../configs/jwtConfig");
const { sendRegistrationEmail } = require("../services/emailService");

//Register func
const register = async (req, res) => {
  try {
    const { phoneNumber, password, email, firstName, lastName, address } =
      req.body;

    //check phone number and email is exist
    const existUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "Email or phone Number is exist." });
    }

    //encrypting passwords
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    //Create new account
    const newUser = new User({
      phoneNumber,
      password: hashedPassword,
      email,
      firstName,
      lastName,
      address,
      verificationCode,
      isVerified: false,
    });

    //save account in db
    await newUser.save();

    // Send verification email
    await sendRegistrationEmail(email, verificationCode);

    //return success notification
    res.status(201).json({
      message:
        "Account created successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    res.json({ message: "Lỗi server", error });
    console.error("Error details:", error);
  }
};

//Login function
const login = async (req, res) => {
  const { identify, password } = req.body;
  try {
    //check identify , password
    const user = await User.findOne({
      $or: [{ email: identify }, { phoneNumber: identify }],
    });
    if (!user) {
      return res.status(401).json({ message: "Incorrect username." });
    }

    if (!user.password || typeof user.password !== "string") {
      return res.status(500).json({ message: "Invalid password." });
    }

    //Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    //create token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const parseExpiresIn = (expiresIn) => {
      const unit = expiresIn.slice(-1);
      const value = parseInt(expiresIn, 10);

      switch (unit) {
        case "s":
          return value * 1000;
        case "m":
          return value * 60 * 1000;
        case "h":
          return value * 60 * 60 * 1000;
        case "d":
          return value * 24 * 60 * 60 * 1000;
        default:
          return value * 1000;
      }
    };

    //Update token and expired time in db
    user.token = token;
    const expiresInMs = parseExpiresIn(JWT_EXPIRES_IN);
    user.expiredAt = new Date(Date.now() + expiresInMs);
    await user.save();

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get info customer func
const getUserInfo = async (req, res) => {
  try {
    //Get token from req
    const token = req.headers.authorization.split(" ")[1];

    //authenticate token
    const decoded = jwt.verify(token, JWT_SECRET);

    //Find a user based on information from the token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //return user information based on a token
    res.status(200).json({
      phoneNumber: user.phoneNumber,
      email: user.email,
      avatarUrl: user.avatarUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

//export func
module.exports = {
  register,
  login,
  getUserInfo,
};
