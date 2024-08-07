require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./configs/dbconfig");
const authRoutes = require("./routes/authRoutes");

const app = express();
//connect to db
connectDb();

// Middleware
app.use(express.json());
app.use(cors());

// Using routes
app.use("/api/auth", authRoutes);

// build server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
