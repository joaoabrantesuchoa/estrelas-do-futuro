import express from "express";
import Student from "../models/student.js";
import fs from "fs";
import multer from "multer";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

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

router.get("/photo/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    const photo = Buffer.from(student.photo).toString("base64");
    return res.status(200).send({ photo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/photo/:id", upload.single("photo"), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send({
        message: "Student not found",
      });
    }
    const photo = fs.readFileSync(req.file.path);

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        photo: photo,
      },
      { new: true }
    );

    return res.status(200).send(updatedStudent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send({
        message: "Student not found",
      });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name !== undefined ? req.body.name : student.name,
        birthDate:
          req.body.birthDate !== undefined
            ? req.body.birthDate
            : student.birthDate,
        motherName:
          req.body.motherName !== undefined
            ? req.body.motherName
            : student.motherName,
        fatherName:
          req.body.fatherName !== undefined
            ? req.body.fatherName
            : student.fatherName,
        responsablePhone:
          req.body.responsablePhone !== undefined
            ? req.body.responsablePhone
            : student.responsablePhone,
        medicalObservations:
          req.body.medicalObservations !== undefined
            ? req.body.medicalObservations
            : student.medicalObservations,
        position:
          req.body.position !== undefined
            ? req.body.position
            : student.position,
        category:
          req.body.category !== undefined
            ? req.body.category
            : student.category,
        photoUrl:
          req.body.photoUrl !== undefined
            ? req.body.photoUrl
            : student.photoUrl,
      },
      { new: true }
    );

    return res.status(200).send(updatedStudent);
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
