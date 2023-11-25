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
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{11}$/.test(value);
      },
      message: "Phone number must have 11 digits (Brazilian format)",
    },
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
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
