import { test, beforeAll } from "vitest";
import request from "supertest";
import sinon from "sinon";
import Student from "../../models/student";
import app from "../../app";

const fs = require("fs");

beforeAll(async () => {
  await Student.deleteMany();
});

test("POST /students", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newStudent.name);
  expect(response.body.birthDate).toBe(newStudent.birthDate);
  expect(response.body.motherName).toBe(newStudent.motherName);
  expect(response.body.fatherName).toBe(newStudent.fatherName);
  expect(response.body.responsablePhone).toBe(newStudent.responsablePhone);
  expect(response.body.medicalObservations).toBe(
    newStudent.medicalObservations
  );
});

test("POST /students with category calculation", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
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
    responsablePhone: "98765432101",
    medicalObservations: "None",
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
    responsablePhone: "98765432101",
    medicalObservations: "None",
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
    responsablePhone: "98765432101",
    medicalObservations: "None",
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
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const sub5Student = {
    name: "sub 5 Student",
    birthDate: "01/01/2019",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
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

test("PUT - change the student model", async ({ expect }) => {
  await Student.deleteMany();

  const student = {
    name: "sub 25 Student",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  let response = await request(app).post("/students").send(student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(student.name);

  const studentId = response.body._id;

  const studentChange = {
    name: "New Student name",
    birthDate: "01/01/2005",
    motherName: "New mother name",
    fatherName: "New father name",
    responsablePhone: "8399149552",
    medicalObservations: "Issues with dipirona",
    position: "Atacante",
  };
  ``;
  response = await request(app)
    .put(`/students/${studentId}`)
    .send(studentChange);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe(studentChange.name);
  expect(response.body.birthDate).toBe(studentChange.birthDate);
  expect(response.body.motherName).toBe(studentChange.motherName);
  expect(response.body.fatherName).toBe(studentChange.fatherName);
  expect(response.body.responsablePhone).toBe(studentChange.responsablePhone);
  expect(response.body.medicalObservations).toBe(
    studentChange.medicalObservations
  );
  expect(response.body.photo).toBe(undefined);
});

test("PUT - change only the specified elements", async ({ expect }) => {
  await Student.deleteMany();

  const student = {
    name: "sub 25 Student",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  let response = await request(app).post("/students").send(student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(student.name);

  const studentId = response.body._id;

  const studentChange = {
    name: "New Student name",
  };
  ``;
  response = await request(app)
    .put(`/students/${studentId}`)
    .send(studentChange);
  expect(response.status).toBe(200);
  expect(response.body.name).toBe(studentChange.name);
  expect(response.body.birthDate).toBe(student.birthDate);
  expect(response.body.motherName).toBe(student.motherName);
  expect(response.body.fatherName).toBe(student.fatherName);
  expect(response.body.responsablePhone).toBe(student.responsablePhone);
  expect(response.body.medicalObservations).toBe(student.medicalObservations);
  expect(response.body.photo).toBe(undefined);
});

test("PUT - update the student photo", async ({ expect }) => {
  await Student.deleteMany();

  const student = {
    name: "Student",
    birthDate: "01/01/2000",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  let response = await request(app).post("/students").send(student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(student.name);

  const studentId = response.body._id;

  const path =
    "/home/joao/Projects/estrelas-do-futuro/server/tests/functional/brasao.jpg";

  const photo = fs.readFileSync(path);

  response = await request(app)
    .put(`/students/photo/${studentId}`)
    .attach("photo", photo, "photo.jpg");

  expect(response.status).toBe(200);

  response = await request(app).get(`/students/photo/${studentId}`);
  expect(response.status).toBe(200);
  expect(typeof response.body.photo).toBe("string");
  expect(Buffer.from(response.body.photo, "base64").toString("base64")).toBe(
    response.body.photo
  );
});
