const mongoose = require("mongoose");

// Define the Doctor schema
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    experience: {
      type: String, 
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient", 
      },
    ],
  },
  { timestamps: true }
);

// Create the Doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
