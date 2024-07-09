const express = require("express");
const patientController = require("../controllers/patient");
const authCheck = require("../middleware/auth-check");
const { body } = require("express-validator");
const { checkRole } = require("../middleware/rbac-check");

const router = express.Router();

router.get(
  "/patients",
  authCheck,
  checkRole(["user", "admin", "superadmin"]),
  patientController.getAllPatients
);
router.get('/patient/total',patientController.totalPatients)
router.get(
  "/patient/growth-trend",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.getPatientGrowthTrend
);

router.get(
  "/patient/age-distribution",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.getAgeDistribution
);
router.get(
  "/patient/gender-ratio",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.getGenderRatio
);
// router.get(
//   "/patient/revenue/",
//   authCheck,
//   checkRole(["admin", "superadmin"]),
//   patientController.getRevenue
// );

router.get(
  "/patient/:patientId",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.getPatientById
);
router.get(
  "/patient/refund/:patientId",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.refundMoney
);

router.post(
  "/patient/create",
  authCheck,
  checkRole(["admin", "superadmin"]),
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("fName").trim().notEmpty().withMessage("Father Name is required."),
    body("age")
      .isInt({ min: 1 })
      .withMessage("Age must be a positive integer."),
    body("gender")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Invalid gender."),
    body("address").trim().notEmpty().withMessage("Address is required."),
    body("record.payment")
      .notEmpty()
      .isNumeric()
      .withMessage("Payment must be a number"),

    body("selectedDoctor").notEmpty().withMessage("Doctor must not be empty"),
    body("record.bloodPressure")
      .optional()
      .isString()
      .withMessage("Blood pressure must be a string"),
    body("record.temperature")
      .optional()
      .isString()
      .withMessage("Temperature must be a string"),
    body("record.respiratoryRate")
      .optional()
      .isString()
      .withMessage("Respiratory rate must be a string"),
    body("record.pulseRate")
      .optional()
      .isString()
      .withMessage("Pulse rate must be a string"),
    body("record.peripheralOxygen")
      .optional()
      .isString()
      .withMessage("Peripheral oxygen must be a string"),

    body("record.diabetes")
      .optional()
      .isBoolean()
      .withMessage("Diabetes must be a boolean (true or false)"),

    body("record.hypertension")
      .optional()
      .isBoolean()
      .withMessage("Hypertension must be a boolean (true or false)"),

    body("record.IHD")
      .optional()
      .isBoolean()
      .withMessage("Ischemic heart disease must be a boolean (true or false)"),

    body("record.hepatitis")
      .optional()
      .isBoolean()
      .withMessage("Hepatitis must be a boolean (true or false)"),

    body("record.previousSurgery")
      .optional()
      .isBoolean()
      .withMessage("Previous surgery must be a boolean (true or false)"),
    body("record.pregnancy")
      .optional()
      .isIn(["true", "false", "NULL"])
      .withMessage("Pregnancy must be one of: 'true', 'false', or 'NULL'"),
    body("record.preMedication")
      .optional()
      .isBoolean()
      .withMessage("Medication must be a boolean (true or false)"),
  ],

  patientController.createPatient
);

router.delete(
  "/patient/delete/:patientId",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.removePatient
);

router.patch(
  "/patient/edit/:patientId",
  authCheck,
  checkRole(["admin", "superadmin"]),
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("fName").trim().notEmpty().withMessage("Name is required."),
    body("age")
      .isInt({ min: 1 })
      .withMessage("Age must be a positive integer."),
    body("gender")
      .isIn(["Male", "Female", "Other"])
      .withMessage("Invalid gender."),
    body("address").trim().notEmpty().withMessage("Address is required."),
    body("payment")
      .notEmpty()
      .isNumeric()
      .withMessage("Payment must be a number"),
  ],

  patientController.editPatient
);

router.post(
  "/patient/create/many",
  authCheck,
  checkRole(["admin", "superadmin"]),
  patientController.insertManyPatients
);
module.exports = router;
