import express from "express";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import studentRouter from "./routes/student.js";

const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

app.get("/", (response) => {
  return response.status(200).send("OK");
});

app.use("/students", studentRouter);

connectDB();
