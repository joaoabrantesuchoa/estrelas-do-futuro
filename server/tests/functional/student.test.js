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
  expect(response.body.age).toBe(24);
});

test("POST /students with category calculation", async ({ expect }) => {
  const newStudent = {
    name: "Test",
    birthDate: "12/01/2012",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const response = await request(app).post("/students").send(newStudent);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(newStudent.name);
  expect(response.body.age).toBe(12);
  expect(response.body.category).toBe(13);
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

test("Get the students by category", async ({ expect }) => {
  await Student.deleteMany();

  const sub17Student = {
    name: "sub 17 Student",
    birthDate: "12/01/2008",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const sub5Student = {
    name: "sub 5 Student",
    birthDate: "12/01/2019",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  let response = await request(app).post("/students").send(sub17Student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(sub17Student.name);

  response = await request(app).post("/students").send(sub5Student);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(sub5Student.name);

  let studentSub = 17;
  let getResponse = await request(app).get(`/students?category=${studentSub}`);
  const student17Body = getResponse.body;

  expect(student17Body.length).toBe(1);
  expect(student17Body[0].name).toBe("sub 17 Student");
  expect(student17Body[0].category).toBe(17);

  studentSub = 5;
  getResponse = await request(app).get(`/students?category=${studentSub}`);
  expect(getResponse.status).toBe(200);
  const student5Body = getResponse.body;

  expect(student5Body.length).toBe(1);
  expect(student5Body[0].name).toBe("sub 5 Student");
  expect(student5Body[0].category).toBe(5);

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

test("GET /students/:id/payments/:year - add a payment and then get payments for a student by year", async ({
  expect,
}) => {
  // Primeiro, criar um novo estudante
  const newStudent = {
    name: "Payment Test Student",
    birthDate: "01/01/2005",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const studentCreationResponse = await request(app)
    .post("/students")
    .send(newStudent);
  expect(studentCreationResponse.status).toBe(201);
  const studentId = studentCreationResponse.body._id;

  const year = 2024;
  const firstMonth = 1;

  let paymentData = {
    paid: true,
    paidBy: "Parent",
    paymentType: "Boleto",
    amount: 100,
    paymentDate: "01/01/2005",
  };

  let paymentAddResponse = await request(app)
    .put(`/students/${studentId}/payments/${year}/${firstMonth}`)
    .send(paymentData);
  expect(paymentAddResponse.status).toBe(201);

  const secondMonth = 2;

  paymentData = {
    paid: true,
    paidBy: "Parent",
    paymentType: "Boleto",
    amount: 100,
    paymentDate: "01/02/2005",
  };

  paymentAddResponse = await request(app)
    .put(`/students/${studentId}/payments/${year}/${secondMonth}`)
    .send(paymentData);
  expect(paymentAddResponse.status).toBe(201);

  const paymentsGetResponse = await request(app).get(
    `/students/${studentId}/payments/${year}`
  );
  expect(paymentsGetResponse.status).toBe(200);
  const paymentsData = paymentsGetResponse.body;

  expect(paymentsData).toBeDefined();
  expect(paymentsData.length).toBeGreaterThanOrEqual(2); // Verifica se ao menos dois pagamentos foram registrados

  // Verifica os detalhes do primeiro pagamento
  const firstMonthPayment = paymentsData.find(
    (payment) => payment.month === 1 && payment.year === year
  );
  expect(firstMonthPayment).toBeDefined();
  expect(firstMonthPayment.paid).toBe(true);
  expect(firstMonthPayment.paidBy).toBe("Parent");
  expect(firstMonthPayment.amount).toBe(100);
  expect(firstMonthPayment.paymentType).toBe("Boleto");
  expect(firstMonthPayment.date).toBe("01/01/2005");

  // Verifica os detalhes do segundo pagamento
  const secondMonthPayment = paymentsData.find(
    (payment) => payment.month === 2 && payment.year === year
  );
  expect(secondMonthPayment).toBeDefined();
  expect(secondMonthPayment.paid).toBe(true);
  expect(secondMonthPayment.paidBy).toBe("Parent");
  expect(secondMonthPayment.amount).toBe(100);
  expect(secondMonthPayment.paymentType).toBe("Boleto");
  expect(secondMonthPayment.date).toBe("01/02/2005");
});

test("GET /students/:id/payments/:year/:month - add a payment and then get payments for a student by year and month", async ({
  expect,
}) => {
  // Primeiro, criar um novo estudante
  const newStudent = {
    name: "Payment Test Student",
    birthDate: "01/01/2005",
    motherName: "Mother",
    fatherName: "Father",
    responsablePhone: "98765432101",
    medicalObservations: "None",
  };

  const studentCreationResponse = await request(app)
    .post("/students")
    .send(newStudent);
  expect(studentCreationResponse.status).toBe(201);

  const studentId = studentCreationResponse.body._id;
  const year = 2024;
  const firstMonth = 1;

  let paymentData = {
    paid: true,
    paidBy: "Parent",
    paymentType: "Boleto",
    amount: 100,
    paymentDate: "01/01/2024",
  };

  let paymentAddResponse = await request(app)
    .put(`/students/${studentId}/payments/${year}/${firstMonth}`)
    .send(paymentData);
  expect(paymentAddResponse.status).toBe(201);

  const secondMonth = 2;
  paymentData = {
    paid: true,
    paidBy: "Parent",
    paymentType: "Boleto",
    amount: 100,
    paymentDate: "01/02/2024",
  };

  paymentAddResponse = await request(app)
    .put(`/students/${studentId}/payments/${year}/${secondMonth}`)
    .send(paymentData);
  expect(paymentAddResponse.status).toBe(201);

  // Testa a rota que pega pagamentos por ano
  const paymentsGetResponse = await request(app).get(
    `/students/${studentId}/payments/${year}`
  );
  expect(paymentsGetResponse.status).toBe(200);
  expect(paymentsGetResponse.body.length).toBeGreaterThanOrEqual(2); // Verifica se ao menos dois pagamentos foram registrados

  // Testa a rota que pega pagamentos por ano e mês
  const firstMonthGetResponse = await request(app).get(
    `/students/${studentId}/payments/${year}/${firstMonth}`
  );
  expect(firstMonthGetResponse.status).toBe(200);
  expect(firstMonthGetResponse.body.length).toBe(1);
  const firstPaymentDetails = firstMonthGetResponse.body[0];
  expect(firstPaymentDetails.paid).toBe(true);
  expect(firstPaymentDetails.paidBy).toBe("Parent");
  expect(firstPaymentDetails.amount).toBe(100);
  expect(firstPaymentDetails.paymentType).toBe("Boleto");
  expect(firstPaymentDetails.date).toBe("01/01/2024");

  const secondMonthGetResponse = await request(app).get(
    `/students/${studentId}/payments/${year}/${secondMonth}`
  );
  expect(secondMonthGetResponse.status).toBe(200);
  expect(secondMonthGetResponse.body.length).toBe(1);
  const secondPaymentDetails = secondMonthGetResponse.body[0];
  expect(secondPaymentDetails.paid).toBe(true);
  expect(secondPaymentDetails.paidBy).toBe("Parent");
  expect(secondPaymentDetails.amount).toBe(100);
  expect(secondPaymentDetails.paymentType).toBe("Boleto");
  expect(secondPaymentDetails.date).toBe("01/02/2024");
});
