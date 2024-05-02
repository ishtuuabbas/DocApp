const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },

    cnicNumber: { type: String },

    ptn: { type: String, required: true, unique: true },

    record: [{ type: mongoose.Schema.Types.ObjectId, ref: "Record" }],

    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],

    arrivalTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
