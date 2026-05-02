const mongoose = require("mongoose");

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection failed");
    throw err;
  }
}

module.exports = { connectToMongo };
