import { test, beforeAll } from "vitest";
import request from "supertest";
import sinon from "sinon";
import Student from "../../models/student";
import app from "../../app";

beforeAll(async () => {
  await Student.deleteMany();
});

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
  expect(response.body.category).toBe(25);
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

test("GET /students", async ({ expect }) => {
  const response = await request(app).get("/students");
  expect(response.status).toBe(200);
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

test("Student category updates as time passes", async ({ expect }) => {
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
  expect(response.body.category).toBe(25);

  const studentId = response.body._id;

  const clock = sinon.useFakeTimers(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const getResponse = await request(app).get(`/students/${studentId}`);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.category).toBe(26);

  clock.restore();
});

test("Get the students by category", async ({ expect }) => {
  await Student.deleteMany();

  const sub25Student = {
    name: "sub 25 Student",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
    position: "atacante",
  };

  const sub5Student = {
    name: "sub 5 Student",
    birthDate: "01/01/2019",
    motherName: "Mother",
    fatherName: "Father",
    phone: "12345678901",
    responsablePhone: "98765432101",
    medicalObservations: "None",
    position: "atacante",
  };

  let response = await request(app).post("/students").send(sub25Student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(sub25Student.name);

  response = await request(app).post("/students").send(sub5Student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(sub5Student.name);

  let studentSub = 25;
  let getResponse = await request(app).get(`/students?category=${studentSub}`);
  const student25Body = getResponse.body;

  expect(student25Body.length).toBe(1);
  expect(student25Body[0].name).toBe("sub 25 Student");
  expect(student25Body[0].category).toBe(25);

  studentSub = 6;
  getResponse = await request(app).get(`/students?category=${studentSub}`);
  expect(getResponse.status).toBe(200);
  const student5Body = getResponse.body;

  expect(student5Body.length).toBe(1);
  expect(student5Body[0].name).toBe("sub 5 Student");
  expect(student5Body[0].category).toBe(6);

  getResponse = await request(app).get(`/students`);
  expect(getResponse.status).toBe(200);

  expect(getResponse.body.length).toBe(2);
});
