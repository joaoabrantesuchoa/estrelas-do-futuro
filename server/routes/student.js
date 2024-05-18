import express from "express";
import Student from "../models/student.js";
import Payment from "../models/payment.js";
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

    const studentsWithBase64Photos = students.map((student) => {
      let photo;
      if (student.photo) {
        photo = Buffer.from(student.photo).toString("base64");
      }
      return { ...student._doc, photo };
    });
    return res.status(200).send(studentsWithBase64Photos);
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

router.get("/:id/payments/:year/:month", async (req, res) => {
  const { id, year, month } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    const payments = await Payment.findOne({
      studentId: id,
      year: year,
      month: month, // Adiciona o filtro por mês
    }).sort({ date: 1 }); // Ordena os pagamentos pela data dentro do mês

    return res.status(200).send(payments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Rota para pegar os pagamentos de um estudante por ano
router.get("/:id/payments/:year", async (req, res) => {
  const { id, year } = req.params;
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    const payments = await Payment.find({
      studentId: id,
      year: year,
    }).sort({ month: 1 });

    return res.status(200).send(payments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

//Rota para realizar os pagamento de um estudante no mês e no ano escolhido.
router.put("/:id/payments/:year/:month", async (req, res) => {
  const { id, year, month } = req.params;
  const { paid, paidBy, amount, paymentType, paymentDate } = req.body;

  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    let payment = await Payment.findOne({
      studentId: id,
      year: year,
      month: month,
    }).sort({ date: 1 });

    if (payment) {
      payment.paid = paid;
      payment.paidBy = paidBy;
      payment.amount = amount;
      payment.paymentType = paymentType;
      payment.date = paymentDate;
    } else {
      payment = new Payment({
        studentId: id,
        year: year,
        month: month,
        date: paymentDate,
        paid,
        paidBy,
        amount,
        paymentType,
      });
    }

    await payment.save();

    return res
      .status(201)
      .send({ message: "Payment recorded successfully", payment });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
