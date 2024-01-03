import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import studentRouter from "./routes/student.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("OK");
});

app.use("/students", studentRouter);

connectDB();

export default app;
