const Patient = require("../model/patients");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Doctor = require("../model/doctor");

exports.addDoctor = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errors.array() });
  }

  const { name, email, specialty, experience } = req.body;

  try {
    const isExists = await Doctor.findOne({ email });

    if (isExists) {
      const error = new Error("Doctor with this Email already exists!");
      error.statusCode = 409;
      throw error;
    }
    const doctor = new Doctor({
      name: name,
      email: email,
      specialty: specialty,
      experience: experience,
    });

    await doctor.save();

    res.status(201).json({
      message: "Doctor created successfully!",
      doctor: doctor,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.allDoctors = async (req, res, next) => {
  try {
    const allDoctors = await Doctor.find();
    if (allDoctors.length === 0) {
      const error = new Error("There is no Doctor in the Database!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "All Doctors Are Fetched Successfully!",
      allDoctors: allDoctors,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllDoctorsName = async (req, res, next) => {
  try {
    const allDoctors = await Doctor.find();
    if (allDoctors.length === 0) {
      const error = new Error("There is no Doctor in the Database!");
      error.statusCode = 404;
      throw error;
    }

    const doctorNames = allDoctors.map((doctor) => ({
      id: doctor._id,
      name: doctor.name,
    }));

    res.status(200).json({
      message: "All Doctors' Names Are Fetched Successfully!",
      doctorNames: doctorNames,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteDoctor = async (req, res, next) => {
  const doctorId = req.params.doctorId;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    const error = new Error("Invalid Doctor ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error("Doctor not found.");
      error.statusCode = 404;
      throw error;
    }

    await Doctor.findByIdAndRemove(doctorId);

    res.status(200).json({ message: "Doctor removed successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.editDoctor = async (req, res, next) => {
  const errors = validationResult(req);

  const doctorId = req.params.doctorId;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    const error = new Error("Invalid Doctor ID.");
    error.statusCode = 400;
    return next(error);
  }

  const { name, email, specialty, experience } = req.body;

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errors.array() });
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error("Doctor not found.");
      error.statusCode = 404;
      throw error;
    }

    doctor.name = name;
    doctor.email = email;
    doctor.specialty = specialty;
    doctor.experience = experience;

    const updatedDoctor = await doctor.save();

    res.status(200).json({
      message: "Patient updated successfully!",
      doctor: updatedDoctor,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDoctorById = async (req, res, next) => {
  const doctorId = req.params.doctorId;

  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    const error = new Error("Invalid Doctor ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      const error = new Error("Doctor not found.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ doctor });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.totalDoctors = async (req, res, next) => {
  try {
    const allDoctors = await Doctor.countDocuments({});
console.log("all patients",allDoctors)
    res.status(200).json({ allDoctors });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

