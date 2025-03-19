const parkingRequestSchema = mongoose.Schema({
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingSlot", // References the ParkingSlot collection
    required: true,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant", // References the Tenant collection
    required: true,
  },
});

export const ParkingRequest = mongoose.model(
  "ParkingRequest",
  parkingRequestSchema
);
