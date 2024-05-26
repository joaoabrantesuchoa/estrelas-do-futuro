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

test("PUT - upload photo for a student", async ({ expect }) => {
  const photoPath = path.join(__dirname, "fixtures", "brasao.jpg");

  const response = await request(app)
    .put(`/students/photo/${studentId}`)
    .attach("photo", photoPath);

  expect(response.status).toBe(200);
  expect(response.body.photo).toBeDefined();
});

test("GET - retrieve photo for a student", async ({ expect }) => {
  const response = await request(app).get(`/students/photo/${studentId}`);
  expect(response.status).toBe(200);
  expect(response.body.photo).toBeDefined(); // Verifica se a foto está definida
});

test("PUT - update photo for a student", async ({ expect }) => {
  const newPhotoPath = path.join(__dirname, "fixtures", "brasao.jpg");

  const updateResponse = await request(app)
    .put(`/students/photo/${studentId}`)
    .attach("photo", newPhotoPath);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.photo).toBeDefined();

  const fetchResponse = await request(app).get(`/students/photo/${studentId}`);
  expect(fetchResponse.status).toBe(200);
  expect(fetchResponse.body.photo).toBeDefined();
});
