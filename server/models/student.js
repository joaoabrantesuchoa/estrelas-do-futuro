import mongoose from "mongoose";

const phoneValidator = [
  validate({
    validator: "matches",
    arguments: /^\d{11}$/,
    message: "Phone number must have 11 digits (Brazilian format)",
  }),
];

const dateValidator = [
  {
    validator: function (value) {
      return moment(value, "DD/MM/YYYY", true).isValid();
    },
    message: "Invalid date format for birthDate. Please use dd/mm/yyyy format.",
  },
];

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    validate: dateValidator,
    set: function (value) {
      return moment(value, "DD/MM/YYYY").toDate();
    },
  },
  motherName: String,
  fatherName: String,
  phone: {
    type: String,
    validate: phoneValidator,
  },
  responsablePhone: {
    type: String,
    validate: phoneValidator,
  },
  medicalObservations: String,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
