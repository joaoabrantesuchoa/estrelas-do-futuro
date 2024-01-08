import { connectDB } from "./db.js";
import Student from "./models/student.js";
import request from "supertest";
import app from "./app.js";

async function seedStudents() {
  await connectDB();

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
    },
    {
      name: "Lucas Lima",
      birthDate: "04/04/2013",
      motherName: "Lúcia Lima",
      fatherName: "Luís Lima",
      phone: "11987654324",
      responsablePhone: "11987654324",
      medicalObservations: "Nenhuma",
      position: "Goleiro",
    },
    {
      name: "Gabriela Gomes",
      birthDate: "05/05/2014",
      motherName: "Gisele Gomes",
      fatherName: "Gilberto Gomes",
      phone: "11987654325",
      responsablePhone: "11987654325",
      medicalObservations: "Asma",
      position: "Defensora",
    },
    {
      name: "Rafael Ribeiro",
      birthDate: "06/06/2015",
      motherName: "Renata Ribeiro",
      fatherName: "Ricardo Ribeiro",
      phone: "11987654326",
      responsablePhone: "11987654326",
      medicalObservations: "Nenhuma",
      position: "Atacante",
    },
    {
      name: "Fernanda Ferreira",
      birthDate: "07/07/2016",
      motherName: "Fátima Ferreira",
      fatherName: "Fábio Ferreira",
      phone: "11987654327",
      responsablePhone: "11987654327",
      medicalObservations: "Alergia a lactose",
      position: "Meio-campo",
    },
    {
      name: "Eduardo Esteves",
      birthDate: "08/08/2017",
      motherName: "Elaine Esteves",
      fatherName: "Edson Esteves",
      phone: "11987654328",
      responsablePhone: "11987654328",
      medicalObservations: "Nenhuma",
      position: "Defensor",
    },
    {
      name: "Isabela Ibarra",
      birthDate: "09/09/2018",
      motherName: "Irene Ibarra",
      fatherName: "Igor Ibarra",
      phone: "11987654329",
      responsablePhone: "11987654329",
      medicalObservations: "Nenhuma",
      position: "Atacante",
    },
    {
      name: "Daniel Dias",
      birthDate: "10/10/2019",
      motherName: "Daniela Dias",
      fatherName: "Danilo Dias",
      phone: "11987654330",
      responsablePhone: "11987654330",
      medicalObservations: "Nenhuma",
      position: "Goleiro",
    },
  ];

  try {
    students.map(async (student) => {
      await request(app).post("/students").send(student);
    });
    console.log("Students seeded successfully!");
  } catch (err) {
    console.error("Error seeding students:", err);
  }
}

seedStudents();
