const mongoose = require("mongoose");
const { ATLAS_URI, NODE_ENV } = require("./serverConfig");

async function connectDB() {
  try {
    if (NODE_ENV == "development") {
      await mongoose.connect(ATLAS_URI);
      console.log("Connected to database");
    }
  } catch (error) {
    console.log("Error connecting to database");
    throw error;
  }
}

module.exports = connectDB;