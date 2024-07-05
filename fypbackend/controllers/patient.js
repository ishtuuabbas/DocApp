const Patient = require("../model/patients");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Record = require("../model/record");
const Doctor = require("../model/doctor");
const User = require("../model/user");
const { format } = require("date-fns");

exports.getAllPatients = async (req, res, next) => {
  try {
    const allPatients = await Patient.find().sort({ createdAt: -1 });
    if (allPatients.length === 0) {
      const error = new Error("Can't Find Any Patient!");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "All Patients Are Fetched Successfully!",
      allPatients: allPatients,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createPatient = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errors.array() });
  }

  const {
    name,
    age,
    gender,
    address,
    fName,
    selectedDoctor,
    phoneNumber,
    cnicNumber,
    ptn,
    record,
  } = req.body;

  try {
    const isExists = await Patient.findOne({ ptn });

    if (isExists) {
      const error = new Error(
        "Patient with this tracking number already exists!"
      );
      error.statusCode = 409;
      throw error;
    }

    if (!mongoose.Types.ObjectId.isValid(selectedDoctor)) {
      const error = new Error("Invalid Doctor ID.");
      error.statusCode = 400;
      return next(error);
    }

    // Create a new record instance using the provided data
    const newRecordData = {
      visitNumber: record.visitNumber,
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

    const patient = new Patient({
      name: name,
      age: age,
      fatherName: fName,
      gender: gender,
      address: address,
      phoneNumber: phoneNumber,
      cnicNumber: cnicNumber,
      ptn: ptn,
      record: [recordInstance._id],
      doctor: [selectedDoctor],
    });

    const createdPatient = await patient.save();

    const doctor = await Doctor.findById(selectedDoctor);
    if (!doctor) {
      const error = new Error("Doctor does't exists!");
      error.statusCode = 409;
      throw error;
    }
    doctor.patients.push(createdPatient._id);
    await doctor.save();

    res.status(201).json({
      message: "Patient created successfully!",
      patient: createdPatient,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removePatient = async (req, res, next) => {
  const patientId = req.params.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    const error = new Error("Invalid patient ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new Error("Patient not found.");
      error.statusCode = 404;
      throw error;
    }

    await Patient.findByIdAndRemove(patientId);

    res.status(200).json({ message: "Patient removed successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editPatient = async (req, res, next) => {
  const errors = validationResult(req);

  const patientId = req.params.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    const error = new Error("Invalid patient ID.");
    error.statusCode = 400;
    return next(error);
  }

  const { name, age, gender, address, phoneNumber, cnicNumber, ptn } = req.body;

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ message: "Validation Failed!", errors: errors.array() });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new Error("Patient not found.");
      error.statusCode = 404;
      throw error;
    }

    patient.name = name;
    patient.age = age;
    patient.gender = gender;
    patient.address = address;
    patient.phoneNumber = phoneNumber;
    patient.ptn = ptn;
    patient.cnicNumber = cnicNumber;

    const updatedPatient = await patient.save();

    res.status(200).json({
      message: "Patient updated successfully!",
      patient: updatedPatient,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPatientById = async (req, res, next) => {
  const patientId = req.params.patientId;

  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    const error = new Error("Invalid patient ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new Error("Patient not found.");
      error.statusCode = 404;
      throw error;
    }
    const recordQueries = patient.record.map(async (recordId) => {
      const patientRecord = await Record.findById(recordId);
      if (!patientRecord) {
        const error = new Error("Record not found.");
        error.statusCode = 404;
        throw error;
      }
      return patientRecord;
    });

    const patientRecords = await Promise.all(recordQueries);
    const totalVists = patientRecords[patientRecords.length - 1].visitNumber;

    res.status(200).json({ patient, patientRecords, totalVisits: totalVists });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.refundMoney = async (req, res, next) => {
  const patientId = req.params.patientId;
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    const error = new Error("Invalid patient ID.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      const error = new Error("Patient not found.");
      error.statusCode = 404;
      throw error;
    }
    const recordId = patient.record[patient.record.length - 1];

    const record = await Record.findById(recordId);
    if (!record) {
      const error = new Error("Record not found.");
      error.statusCode = 404;
      throw error;
    }

    if (record.refundStatus) {
      res.status(200).json({ message: "Money is already refunded!" });
    }

    record.refundStatus = true;
    await record.save();

    const userId = req.user.userId;
    const loggedInUser = await User.findById(userId);
    if (!loggedInUser) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    loggedInUser.refundedPatients.push(patientId);
    await loggedInUser.save();

    res.status(200).json({ message: "Money Refunded Successfully!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.insertManyPatients = async (req, res, next) => {
  try {
    const patients = req.body;
    // console.log(patients);
    for (const patient of patients) {
      const ptn = patient.ptn;
      const responses = [];
      const existingPatient = await Patient.findOne({ ptn }).populate("record");


      if (existingPatient) {
    
        const existingPatientVisitNumber =
          existingPatient.record[existingPatient.record.length - 1].visitNumber;

        const newRecordData = {
          visitNumber: existingPatientVisitNumber + patient.record.visitNumber,
          payment: patient.record.payment,
          token: patient.record.token,
          healthInfo: {
            bloodPressure: patient.record.bloodPressure,
            temperature: patient.record.temperature,
            respiratoryRate: patient.record.respiratoryRate,
            pulseRate: patient.record.pulseRate,
            peripheralOxygen: patient.record.spo,
            diabetes: patient.record.diabetes,
            diabetesType: patient.record.diabetesType,
            hypertension: patient.record.hypertension,
            ischemicHeartDisease: patient.record.IHD,
            hepatitis: patient.record.hepatitis,
            pregnancy: patient.record.pregnancy,
            previousSurgery: patient.record.previousSurgery,
            preMedication: patient.record.preMedication,
          },
        };

        const recordInstance = new Record(newRecordData);
        await recordInstance.save();

        existingPatient.record.push(recordInstance._id);

        existingPatient.doctor.push(patient.selectedDoctor);

        const doctor = await Doctor.findById(patient.selectedDoctor);
        if (!doctor) {
          const error = new Error("Doctor does't exists!");
          error.statusCode = 409;
          throw error;
        }
        doctor.patients.push(existingPatient._id);
        await doctor.save();

        await existingPatient.save();
        responses.push({
          success: true,
          message: "Existing Patients Record Added successfully!",
        });
      } else {
        const newRecordData = {
          visitNumber: patient.record.visitNumber,
          payment: patient.record.payment,
          token: patient.record.token,
          healthInfo: {
            bloodPressure: patient.record.bloodPressure,
            temperature: patient.record.temperature,
            respiratoryRate: patient.record.respiratoryRate,
            pulseRate: patient.record.pulseRate,
            peripheralOxygen: patient.record.spo,
            diabetes: patient.record.diabetes,
            diabetesType: patient.record.diabetesType,
            hypertension: patient.record.hypertension,
            ischemicHeartDisease: patient.record.IHD,
            hepatitis: patient.record.hepatitis,
            pregnancy: patient.record.pregnancy,
            previousSurgery: patient.record.previousSurgery,
            preMedication: patient.record.preMedication,
          },
        };

        const recordInstance = new Record(newRecordData);
        await recordInstance.save();

        const newPatient = new Patient({
          name: patient.name,
          age: patient.age,
          fatherName: patient.fName,
          gender: patient.gender,
          address: patient.address,
          phoneNumber: patient.phoneNumber,
          cnicNumber: patient.cnicNumber,
          ptn: patient.ptn,
          record: [recordInstance._id],
          doctor: [patient.selectedDoctor],
        });

        const createdPatient = await newPatient.save();

        const doctor = await Doctor.findById(patient.selectedDoctor);
        if (!doctor) {
          const error = new Error("Doctor does't exists!");
          error.statusCode = 409;
          throw error;
        }
        doctor.patients.push(createdPatient._id);
        await doctor.save();

        responses.push({
          success: true,
          message: "Patient created successfully!",
        });
      }
    }
    res.status(201).json(responses);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.totalPatients = async (req, res, next) => {
  try {
    const allPatients = await Patient.countDocuments({});
console.log("all patients",allPatients)
    res.status(200).json({ allPatients });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getPatientGrowthTrend = async (req, res, next) => {
  try {
    const { trend } = req.query;

    let fromDate, toDate, labelFormat;

    if (trend === "daily") {
      fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);
      toDate = new Date();
      toDate.setHours(23, 59, 59, 999);
      labelFormat = "hh:mm a";
    } else if (trend === "monthly") {
      fromDate = new Date();
      fromDate.setDate(1);
      fromDate.setHours(0, 0, 0, 0);
      toDate = new Date();
      toDate.setMonth(toDate.getMonth() + 1, 0);
      toDate.setHours(23, 59, 59, 999);
      labelFormat = "MMM";
    } else if (trend === "yearly") {
      fromDate = new Date();
      fromDate.setMonth(0, 1);
      fromDate.setHours(0, 0, 0, 0);
      toDate = new Date();
      toDate.setMonth(11, 31);
      toDate.setHours(23, 59, 59, 999);
      labelFormat = "yyyy";
    } else {
      return res.status(400).json({ message: "Invalid trend parameter" });
    }

    const patients = await Patient.find({
      arrivalTime: { $gte: fromDate, $lte: toDate },
    }).populate("record");

    const chartData = organizeDataBasedOnTrend(patients, trend, labelFormat);

    res.status(200).json({
      trend: trend,
      chartData: chartData,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Helper function to organize data based on the trend
const organizeDataBasedOnTrend = (patients, trend, labelFormat) => {
  let labels, data;

  if (trend === "daily") {
    labels = Array.from({ length: 4 }, (_, index) => {
      const startHour = index * 6;
      const endHour = (index + 1) * 6;
      const startTime = format(
        new Date().setHours(startHour, 0, 0, 0),
        "HH:mm"
      );
      const endTime = format(new Date().setHours(endHour, 0, 0, 0), "HH:mm");
      return `${startTime} - ${endTime}`;
    });

    data = Array.from({ length: 4 }, () => 1); // Modify this according to your actual data
  } else if (trend === "monthly") {
    labels = Array.from(
      { length: 12 },
      (_, index) => format(new Date().setMonth(index, 1), "MMM") // Abbreviate month names
    );

    data = labels.map((_, index) => {
      const startIndex = Math.max(0, index - 6);
      const endIndex = index + 1;
      const sum = patients
        .slice(startIndex, endIndex)
        .reduce((acc, patient) => {
          return acc + patient.record.length; // Assuming each record contributes a value
        }, 0);
      return sum / Math.min(endIndex, 7);
    });
  } else if (trend === "yearly") {
    labels = Array.from({ length: 5 }, (_, index) => {
      const startYear = new Date().getFullYear() + index;
      const endYear = startYear + 1;
      return `${startYear}`;
    });

    data = labels.map((_, index) => {
      const startYear = new Date().getFullYear() + index;
      const endYear = startYear + 1;
      const sum = patients.filter(
        (patient) =>
          patient.arrivalTime >= new Date(`${startYear}-01-01`) &&
          patient.arrivalTime < new Date(`${endYear}-01-01`)
      ).length;

      return sum;
    });
  }

  return {
    labels: labels,
    datasets: [
      {
        label: `Patient Growth (${
          trend.charAt(0).toUpperCase() + trend.slice(1)
        })`,
        data: data,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };
};

exports.getAgeDistribution = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    // Define age groups
    const ageGroups = {
      "0-10": 0,
      "11-20": 0,
      "21-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51-60": 0,
      "61+": 0,
    };

    // Categorize ages and count patients in each group
    patients.forEach((patient) => {
      const age = patient.age;
      if (age <= 10) ageGroups["0-10"]++;
      else if (age <= 20) ageGroups["11-20"]++;
      else if (age <= 30) ageGroups["21-30"]++;
      else if (age <= 40) ageGroups["31-40"]++;
      else if (age <= 50) ageGroups["41-50"]++;
      else if (age <= 60) ageGroups["51-60"]++;
      else ageGroups["61+"]++;
    });

    // Extract counts for each age group
    const ageDistributionData = Object.values(ageGroups);

    res.status(200).json({ ageDistributionData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getGenderRatio = async (req, res, next) => {
  try {
    const genderDistribution = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 },
        },
      },
    ]);

    // Initialize counts with default values
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;

    // Update counts based on the aggregation result
    genderDistribution.forEach((gender) => {
      if (gender._id === "Male") {
        maleCount = gender.count;
      } else if (gender._id === "Female") {
        femaleCount = gender.count;
      } else {
        otherCount = gender.count;
      }
    });

    // Create gender ratio data
    const genderRatioData = [maleCount, femaleCount, otherCount];

    res.status(200).json({ genderRatioData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRevenue = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "records", // The name of the records collection
          localField: "record",
          foreignField: "_id",
          as: "recordData",
        },
      },
      {
        $unwind: "$recordData",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          payment: "$recordData.payment",
          refundStatus: "$recordData.refundStatus",
          createdAt: "$recordData.createdAt",
        },
      },
      {
        $group: {
          _id: {
            daily: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            monthly: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            yearly: {
              year: { $year: "$createdAt" },
            },
          },
          totalRevenue: { $sum: "$payment" },
          totalDiscount: {
            $sum: { $cond: { if: "$refundStatus", then: "$payment", else: 0 } },
          },
          discountApplied: {
            $sum: { $cond: { if: "$refundStatus", then: 0, else: "$payment" } },
          },
        },
      },
    ];

    const groupedData = await Patient.aggregate(pipeline);

    const revenueData = groupedData
      .map((item) => {
        return {
          label: "Daily",
          totalRevenue: item._id.daily ? item.totalRevenue : 0,
          totalDiscount: item._id.daily ? item.totalDiscount : 0,
          discountApplied: item._id.daily ? item.discountApplied : 0,
        };
      })
      .concat(
        groupedData.map((item) => {
          return {
            label: "Monthly",
            totalRevenue: item._id.monthly ? item.totalRevenue : 0,
            totalDiscount: item._id.monthly ? item.totalDiscount : 0,
            discountApplied: item._id.monthly ? item.discountApplied : 0,
          };
        })
      )
      .concat(
        groupedData.map((item) => {
          return {
            label: "Yearly",
            totalRevenue: item._id.yearly ? item.totalRevenue : 0,
            totalDiscount: item._id.yearly ? item.totalDiscount : 0,
            discountApplied: item._id.yearly ? item.discountApplied : 0,
          };
        })
      );

    res.status(200).json({ revenueData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
