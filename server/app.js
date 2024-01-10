import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import studentRouter from "./routes/student.js";
import estrelasDoFuturoRouter from "./routes/estrelasDoFuturo.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/students", studentRouter);
app.use("/", estrelasDoFuturoRouter);

await connectDB();

export default app;
