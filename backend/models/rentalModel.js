import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    rentalName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    facilities: {
      type: [String], // Store facilities as an array of strings
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    availableRooms: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Rental = mongoose.model("Rental", rentalSchema);
