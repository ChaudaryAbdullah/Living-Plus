import mongoose from "mongoose";
import express from "express";
import { PORT, DB_URL } from "./config.js";
import cors from "cors";

import renatlRoutes from "./routes/rentalRoutes.js";
import parkingAllocationRoutes from "./routes/parkingAllocationRoutes.js";
import parkingRequestRoutes from "./routes/parkingRequestRoutes.js";
import parkingSlotRoutes from "./routes/parkingSlotRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import applicantRoutes from "./routes/applicantRoutes.js";
const app = express()
app.use(
  cors()
  // cors({
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Content-Type"],
  // })
);

app.use(express.json());
app.use("/rentals", renatlRoutes);
app.use("/parkingAllocation", parkingAllocationRoutes);
app.use("/parkingRequest", parkingRequestRoutes);
app.use("/parkingSlot", parkingSlotRoutes);
app.use("/owner", ownerRoutes);
app.use("/applicant", applicantRoutes);
app.use("/tenant", tenantRoutes);

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });
