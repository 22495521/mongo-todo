const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to database successfully");
  } catch (err) {
    console.error("Error connecting to database");
  }
}

module.exports = connectDB;
