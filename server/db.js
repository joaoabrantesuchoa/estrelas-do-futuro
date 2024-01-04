import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDB = process.env.MONGO_DB_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("App is connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};
