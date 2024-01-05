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
    required: true,
  },

  category: {
    type: Number,
  },

  photoUrl: {
    type: String,
  },
});

studentSchema.virtual("age").get(function () {
  const birthDate = moment(this.birthDate, "DD/MM/YYYY");
  const now = moment();
  return now.diff(birthDate, "years");
});

studentSchema.pre("save", function (next) {
  this.category = Math.floor(this.age) + 1;

  next();
});

studentSchema.methods.updateCategory = function () {
  const birthDate = moment(this.birthDate, "DD/MM/YYYY");
  const now = moment();
  this.category = Math.floor(now.diff(birthDate, "years")) + 1;
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
