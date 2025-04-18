import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    total: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
