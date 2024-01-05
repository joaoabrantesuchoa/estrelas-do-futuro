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
      responsablePhone,
      medicalObservations,
    } = req.body;

    if (
      !name ||
      !birthDate ||
      !motherName ||
      !fatherName ||
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
      responsablePhone,
      medicalObservations,
    });

    return res.status(201).send(newStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let students;

    if (req.query.category) {
      const category = Number(req.query.category);
      students = await Student.find({ category: category });
    } else {
      students = await Student.find();
    }
    return res.status(200).send(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    student.updateCategory();
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    return res.status(200).send(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).send({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
