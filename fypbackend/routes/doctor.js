const express = require("express");
const doctorController = require("../controllers/doctor");
const authCheck = require("../middleware/auth-check");
const { body } = require("express-validator");
const { checkRole } = require("../middleware/rbac-check");

const router = express.Router();

router.get(
  "/doctors",
  doctorController.allDoctors
);

router.get(
  "/doctors/name",
  authCheck,
  checkRole(["admin", "superadmin"]),
  doctorController.getAllDoctorsName
);

router.get(
  "/doctor/:doctorId",
  authCheck,
  checkRole(["admin", "superadmin"]),
  doctorController.getDoctorById
);

router.delete(
  "/doctor/delete/:doctorId",
  authCheck,
  checkRole(["superadmin"]),
  doctorController.deleteDoctor
);

router.post(
  "/doctor/create",
  authCheck,
  checkRole(["superadmin"]),
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ max: 50 })
      .withMessage("Name must be at most 50 characters."),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("specialty")
      .trim()
      .notEmpty()
      .withMessage("Specialty is required.")
      .isLength({ max: 100 })
      .withMessage("Specialty must be at most 100 characters."),
    body("experience")
      .trim()
      .notEmpty()
      .withMessage("Experience is required.")
      .matches(/^\d+$/)
      .withMessage("Experience should be a positive integer."),
  ],
  doctorController.addDoctor
);

router.post(
  "/doctor/edit/:doctorId",
  authCheck,
  checkRole(["superadmin"]),
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required.")
      .isLength({ max: 50 })
      .withMessage("Name must be at most 50 characters."),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("specialty")
      .trim()
      .notEmpty()
      .withMessage("Specialty is required.")
      .isLength({ max: 100 })
      .withMessage("Specialty must be at most 100 characters."),
    body("experience")
      .trim()
      .notEmpty()
      .withMessage("Experience is required.")
      .matches(/^\d+$/)
      .withMessage("Experience should be a positive integer."),
  ],
  doctorController.editDoctor
);


router.get('/doctors/total',doctorController.totalDoctors)

module.exports = router;
