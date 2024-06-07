
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
      email: {
        type: String,
        required: true,    
        },
    age: {
      type: String,
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
      minLenght: [11,"Phone Number must contain 11 digits!"],
      maxLenght: [11,"Phone Number must contain 11 digits!"]
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
      unique: true, 
    },  
    status: {
      type: String,
      enum: ["Pending", "Cancelled", "Confirmed"],
      required: true,
    },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    
  },
  { timestamps: true }
);

const appointment = mongoose.model("appointment", appointmentSchema);

module.exports = appointment;

