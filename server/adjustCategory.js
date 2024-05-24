import { connectDB } from "./db.js";
import Student from "./models/student.js";
import moment from "moment";

async function seedStudents() {
  await connectDB();

  const students = await Student.find();

  try {
    for (let student of students) {
      const birthYear = moment(student.birthDate, "DD/MM/YYYY").year();

      if (birthYear === 2021 || birthYear === 2022) {
        student.category = 3;
      } else if (birthYear === 2019 || birthYear === 2020) {
        student.category = 5;
      } else if (birthYear === 2017 || birthYear === 2018) {
        student.category = 7;
      } else if (birthYear === 2015 || birthYear === 2016) {
        student.category = 9;
      } else if (birthYear === 2013 || birthYear === 2014) {
        student.category = 11;
      } else if (birthYear === 2011 || birthYear === 2012) {
        student.category = 13;
      } else if (birthYear === 2009 || birthYear === 2010) {
        student.category = 15;
      } else if (birthYear === 2007 || birthYear === 2008) {
        student.category = 17;
      }

      await student.save();
    }

    console.log("Adjust student category");
  } catch (err) {
    console.error("Error adjusting student category:", err);
  }
}

seedStudents();
