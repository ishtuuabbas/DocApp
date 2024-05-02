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
      type: String, // You can use Number or String depending on how you want to store experience
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
        ref: "Patient", // Assuming you have a "Patient" model as well
      },
    ],
  },
  { timestamps: true }
);

// Create the Doctor model
const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
