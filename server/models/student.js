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

  photo: {
    type: Buffer,
    default: Buffer.alloc(0),
  },

  evaluation: {
    type: Buffer,
    default: Buffer.alloc(0),
  },
});

studentSchema.statics.determineCategory = function (age, birthYear) {
  if (birthYear === 2021 || birthYear === 2022) {
    return 3;
  } else if (birthYear === 2019 || birthYear === 2020) {
    return 5;
  } else if (birthYear === 2017 || birthYear === 2018) {
    return 7;
  } else if (birthYear === 2015 || birthYear === 2016) {
    return 9;
  } else if (birthYear === 2013 || birthYear === 2014) {
    return 11;
  } else if (birthYear === 2011 || birthYear === 2012) {
    return 13;
  } else if (birthYear === 2009 || birthYear === 2010) {
    return 15;
  } else if (birthYear === 2007 || birthYear === 2008) {
    return 17;
  } else {
    return age;
  }
};

const updateAgeAndCategory = (student) => {
  const birthDate = moment(student.birthDate, "DD/MM/YYYY");
  student.age = moment().diff(birthDate, "years");
  student.category = studentSchema.statics.determineCategory(
    student.age,
    birthDate.year()
  );
};

studentSchema.pre("save", function (next) {
  updateAgeAndCategory(this);
  next();
});

studentSchema.pre(
  ["updateOne", "findOneAndUpdate", "findByIdAndUpdate", "findById"],
  async function (next) {
    const update = this.getUpdate();
    if (update.birthDate) {
      const birthDate = moment(update.birthDate, "DD/MM/YYYY");
      update.age = moment().diff(birthDate, "years");
      update.category = studentSchema.statics.determineCategory(
        update.age,
        birthDate.year()
      );
    }
    next();
  }
);

studentSchema.methods.updateAgeAndCategory = function () {
  updateAgeAndCategory(this);
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
