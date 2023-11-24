import { test } from "vitest";
import request from "supertest";
import app from "../../app";

test("POST /students", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newStudent.name);
});

test("GET /students", async ({ expect }) => {
  const response = await request(app).get("/students");
  expect(response.status).toBe(200);
});

test("POST /students with missing fields", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    // birthDate is missing
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(400);
});

test("GET /students/:id", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };
  const created = await request(app).post("/students").send(newStudent);

  const id = created.body._id;
  const response = await request(app).get(`/students/${id}`);
  expect(response.status).toBe(200);
});

test("DELETE /students/:id", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };
  const created = await request(app).post("/students").send(newStudent);

  const id = created.body._id;
  const response = await request(app).delete(`/students/${id}`);
  expect(response.status).toBe(200);
});
