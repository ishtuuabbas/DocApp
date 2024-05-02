const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    visitNumber: {
      type: Number,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
    refundStatus: {
      type: Boolean,
      default: false,
    },
    token: { type: Number, required: true },
    healthInfo: {
      bloodPressure: String,
      temperature: String,
      respiratoryRate: String,
      pulseRate: String,
      peripheralOxygen: String,
      diabetes: Boolean,
      diabetesType: String,
      hypertension: Boolean,
      ischemicHeartDisease: Boolean,
      hepatitis: Boolean,
      pregnancy: {
        type: String,
        enum: ["true", "false", "NULL"],
      },
      previousSurgery: Boolean,
      preMedication: Boolean,
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
