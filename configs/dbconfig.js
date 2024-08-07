const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const dbURI =
      "mongodb+srv://thanguty2212:thangmau1822@cluster0.8q48ob5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDb;
