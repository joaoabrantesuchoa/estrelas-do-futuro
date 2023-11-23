import express from "express";
import Student from "../models/student.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      birthDate,
      motherName,
      fatherName,
      phone,
      responsablePhone,
      medicalObservations,
    } = req.body;

    if (
      !name ||
      !birthDate ||
      !motherName ||
      !fatherName ||
      !phone ||
      !responsablePhone ||
      !medicalObservations
    ) {
      return res.status(400).send({
        message:
          "All required fields must be provided: name, birthDate, motherName, fatherName, phone, responsablePhone, medicalObservations",
      });
    }

    const newStudent = await Student.create({
      name,
      birthDate,
      motherName,
      fatherName,
      phone,
      responsablePhone,
      medicalObservations,
    });

    return res.status(201).send(newStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
