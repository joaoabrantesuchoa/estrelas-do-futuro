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

studentSchema.virtual("age").get(function () {
  const birthDate = moment(this.birthDate, "DD/MM/YYYY");
  const now = moment();
  return now.diff(birthDate, "years");
});

studentSchema.pre("save", function (next) {
  this.category = this.calculateCategory();

  next();
});

studentSchema.methods.updateCategory = function () {
  this.category = this.calculateCategory();
};

studentSchema.methods.calculateCategory = function () {
  const age = this.age;
  let category;

  if (age <= 3) {
    category = 3;
  } else if (age <= 5) {
    category = 5;
  } else if (age <= 7) {
    category = 7;
  } else if (age <= 9) {
    category = 9;
  } else if (age <= 11) {
    category = 11;
  } else if (age <= 13) {
    category = 13;
  } else if (age <= 15) {
    category = 15;
  } else if (age <= 17) {
    category = 17;
  } else {
    category = age;
  }

  return category;
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
