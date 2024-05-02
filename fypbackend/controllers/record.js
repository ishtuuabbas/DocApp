const Patient = require("../model/patients");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Record = require("../model/record");
const Doctor = require("../model/doctor");

exports.newRecord = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errors.array() });
  }

  const patientId = req.params.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    const error = new Error("Invalid patient ID.");
    error.statusCode = 400;
    return next(error);
  }

  const { selectedDoctor, record } = req.body;

  try {
    const existingPatient = await Patient.findById(patientId);

    if (!existingPatient) {
      const error = new Error("Patient Does't exists!");
      error.statusCode = 404;
      throw error;
    }
    const existingPatientTotalRecord = existingPatient.record.length;

    const newRecordData = {
      visitNumber: existingPatientTotalRecord + 1,
      payment: record.payment,
      token: record.token,
      healthInfo: {
        bloodPressure: record.bloodPressure,
        temperature: record.temperature,
        respiratoryRate: record.respiratoryRate,
        pulseRate: record.pulseRate,
        peripheralOxygen: record.spo,
        diabetes: record.diabetes,
        diabetesType: record.diabetesType,
        hypertension: record.hypertension,
        ischemicHeartDisease: record.IHD,
        hepatitis: record.hepatitis,
        pregnancy: record.pregnancy,
        previousSurgery: record.previousSurgery,
        preMedication: record.preMedication,
      },
    };

    const recordInstance = new Record(newRecordData);
    await recordInstance.save();

    existingPatient.record.push(recordInstance._id);
    existingPatient.doctor.push(selectedDoctor);

    const doctor = await Doctor.findById(selectedDoctor);
    if (!doctor) {
      const error = new Error("Doctor does't exists!");
      error.statusCode = 409;
      throw error;
    }
    doctor.patients.push(existingPatient._id);
    await doctor.save();

    await existingPatient.save();

    res.status(201).json({
      message: "New Record Successfully Added!",
      patient: existingPatient,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPatientRecordsById = async (req, res, next) => {
  const patientId = req.params.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    const error = new Error("Invalid patient ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const patient = await Patient.findById(patientId).populate("record");

    if (!patient) {
      const error = new Error("Patient's Records Does't exists!");
      error.statusCode = 404;
      throw error;
    }

    const patientRecords = patient.record;

    res.status(201).json({
      message: "All Records Are Fetched Successfully!",
      patientRecords: patientRecords,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
