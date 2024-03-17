import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          // Verifica se o mês é válido (entre 1 e 12)
          return value >= 1 && value <= 12;
        },
        message: (props) => `${props.value} is not a valid month number!`,
      },
    },
    date: {
      type: Date,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paidBy: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 0,
    },
    paymentType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Inclui campos createdAt e updatedAt automaticamente
  }
);

// Índice composto para evitar duplicatas de pagamentos no mesmo mês e ano para um estudante
paymentSchema.index({ studentId: 1, year: 1, month: 1 }, { unique: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
