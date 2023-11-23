import mongoose from "mongoose";
import { mongoDBURL } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log("App is connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};
