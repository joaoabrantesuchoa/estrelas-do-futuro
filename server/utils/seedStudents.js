import { connectDB } from "../db.js";
import Student from "../models/student.js";

async function seedStudents() {
  await connectDB()

  await Student.deleteMany();

  const students = [
    {
      name: "João Silva",
      birthDate: "01/01/2010",
      motherName: "Maria Silva",
      fatherName: "José Silva",
      phone: "11987654321",
      responsablePhone: "11987654321",
      medicalObservations: "Nenhuma",
      position: "Atacante",
      photoUrl: "url_da_foto",
    },
    {
      name: "Ana Souza",
      birthDate: "02/02/2011",
      motherName: "Carla Souza",
      fatherName: "Carlos Souza",
      phone: "11987654322",
      responsablePhone: "11987654322",
      medicalObservations: "Alergia a amendoim",
      position: "Defensora",
      photoUrl: "url_da_foto",
    },
    {
      name: "Pedro Santos",
      birthDate: "03/03/2012",
      motherName: "Julia Santos",
      fatherName: "Roberto Santos",
      phone: "11987654323",
      responsablePhone: "11987654323",
      medicalObservations: "Diabetes tipo 1",
      position: "Meio-campo",
      photoUrl: "url_da_foto",
    },
  ];

  try {
    await Student.insertMany(students);
    console.log("Students seeded successfully!");
  } catch (err) {
    console.error("Error seeding students:", err);
  }
}

seedStudents();
