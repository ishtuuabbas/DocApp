const express = require("express");
const recordController = require("../controllers/record");
const authCheck = require("../middleware/auth-check");
const { body } = require("express-validator");
const { checkRole } = require("../middleware/rbac-check");

const router = express.Router();

router.post(
  "/patient/:patientId/new/record",
  [
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
  authCheck,
  checkRole(["admin", "superadmin"]),
  recordController.newRecord
);

router.get(
  "/patient/:patientId/all-records",
  authCheck,
  checkRole(["admin", "superadmin"]),
  recordController.getPatientRecordsById
);

module.exports = router;
