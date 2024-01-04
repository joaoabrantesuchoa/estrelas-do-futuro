import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("App is connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};
