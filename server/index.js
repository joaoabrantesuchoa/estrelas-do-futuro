import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import Student from "./models/student.js";

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("OK");
});

app.post("/students", async (request, response) => {
  try {
    const {
      name,
      birthDate,
      motherName,
      fatherName,
      phone,
      responsablePhone,
      medicalObservations,
    } = request.body;

    if (
      !name ||
      !birthDate ||
      !motherName ||
      !fatherName ||
      !phone ||
      !responsablePhone ||
      !medicalObservations
    ) {
      return response.status(400).send({
        message:
          "All required fields must be provided: name, birthDate, motherName, fatherName, phone, responsablePhone, medicalObservations",
      });
    }

    const newStudent = {
      name,
      birthDate,
      motherName,
      fatherName,
      phone,
      responsablePhone,
      medicalObservations,
    };

    await Student.create(newStudent);

    return response.status(201).send(newStudent);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
  })
  .catch((error) => {
    console.log(error);
  });
