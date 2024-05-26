import { connectDB } from "./db.js";
import Student from "./models/student.js";
import Payment from "./models/payment.js";

async function clearDB() {
  await connectDB();

  await Student.deleteMany();
  await Payment.deleteMany();
}

clearDB();
