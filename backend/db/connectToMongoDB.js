import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToMongoDB = async () => {
  try {
    console.log("MongoDB URI in connectToMongoDB.js:", process.env.MONGO_DB_URI);  // Debugging line
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongoDB;
