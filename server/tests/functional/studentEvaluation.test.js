import { test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../app";
import path from "path";

let studentId;

beforeAll(async () => {
  const student = {
    name: "Test Student",
    birthDate: "15/03/2005",
    motherName: "Test Mother",
    fatherName: "Test Father",
    responsablePhone: "11987654321",
    medicalObservations: "None",
  };

  const response = await request(app).post("/students").send(student);
  studentId = response.body._id;
});

test("PUT - upload evaluation for a student", async ({ expect }) => {
  const evaluationPath = path.join(__dirname, "fixtures", "brasao.jpg");

  const response = await request(app)
    .put(`/students/evaluation/${studentId}`)
    .attach("evaluation", evaluationPath);

  expect(response.status).toBe(200);
  expect(response.body.evaluation).toBeDefined();
});

test("GET - retrieve evaluation for a student", async ({ expect }) => {
  const response = await request(app).get(`/students/evaluation/${studentId}`);
  expect(response.status).toBe(200);
  expect(response.body.evaluation).toBeDefined(); // Verifica se a foto está definida
});

test("PUT - update evaluation for a student", async ({ expect }) => {
  const newEvaluationPath = path.join(__dirname, "fixtures", "brasao.jpg");

  const updateResponse = await request(app)
    .put(`/students/evaluation/${studentId}`)
    .attach("evaluation", newEvaluationPath);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.evaluation).toBeDefined();

  const fetchResponse = await request(app).get(
    `/students/evaluation/${studentId}`
  );
  expect(fetchResponse.status).toBe(200);
  expect(fetchResponse.body.evaluation).toBeDefined();
});
