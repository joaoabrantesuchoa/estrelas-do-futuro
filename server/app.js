import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import studentRouter from "./routes/student.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/students", studentRouter);

await connectDB();

export default app;
