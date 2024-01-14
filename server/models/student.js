import mongoose from "mongoose";
import moment from "moment";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return moment(value, "DD/MM/YYYY", true).isValid();
      },
      message:
        "Invalid date format for birthDate. Please use dd/mm/yyyy format.",
    },
  },
  age: {
    type: Number,
    required: false,
  },
  motherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  responsablePhone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{11}$/.test(value);
      },
      message: "Phone number must have 11 digits (Brazilian format)",
    },
  },
  medicalObservations: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: false,
  },

  category: {
    type: Number,
  },
});

studentSchema.pre("save", function (next) {
  const birthDate = moment(this.birthDate, "DD/MM/YYYY");
  const now = moment();
  this.age = now.diff(birthDate, "years");
  this.category = this.calculateCategory();
  next();
});

studentSchema.methods.updateCategory = function () {
  const birthDate = moment(this.birthDate, "DD/MM/YYYY");
  const now = moment();
  this.age = now.diff(birthDate, "years");
  this.category = this.calculateCategory();
};

studentSchema.methods.calculateCategory = function () {
  const age = this.age;
  const birthYear = moment(this.birthDate, "DD/MM/YYYY").year();
  let category;

  if (birthYear === 2021 || birthYear === 2022) {
    category = 3;
  } else if (birthYear === 2019 || birthYear === 2020) {
    category = 5;
  } else if (birthYear === 2017 || birthYear === 2018) {
    category = 7;
  } else if (birthYear === 2015 || birthYear === 2016) {
    category = 9;
  } else if (birthYear === 2013 || birthYear === 2014) {
    category = 11;
  } else if (birthYear === 2011 || birthYear === 2012) {
    category = 13;
  } else if (birthYear === 2009 || birthYear === 2010) {
    category = 15;
  } else if (birthYear === 2007 || birthYear === 2008) {
    category = 17;
  } else {
    category = age;
  }

  return category;
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
