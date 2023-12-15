import { test } from "vitest";
import request from "supertest";
import sinon from "sinon";
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
    position: "atacante",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newStudent.name);
  expect(response.body.birthDate).toBe(newStudent.birthDate);
  expect(response.body.motherName).toBe(newStudent.motherName);
  expect(response.body.fatherName).toBe(newStudent.fatherName);
  expect(response.body.phone).toBe(newStudent.phone);
  expect(response.body.responsablePhone).toBe(newStudent.responsablePhone);
  expect(response.body.medicalObservations).toBe(
    newStudent.medicalObservations
  );
  expect(response.body.position).toBe(newStudent.position);
});

test("POST /students with category calculation", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
    position: "atacante",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newStudent.name);
  expect(response.body.category).toBe(24);
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
    position: "atacante",
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
    position: "atacante",
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
    position: "atacante",
  };
  const created = await request(app).post("/students").send(newStudent);

  const id = created.body._id;
  const response = await request(app).delete(`/students/${id}`);
  expect(response.status).toBe(200);
});

test("Category updates as time passes", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000", // A idade será 23
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
    position: "atacante",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newStudent.name);
  expect(response.body.category).toBe(24);

  const studentId = response.body._id;

  const clock = sinon.useFakeTimers(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const getResponse = await request(app).get(`/students/${studentId}`);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.category).toBe(25);

  clock.restore();
});
