
const express = require("express");
const authCheck = require("../middleware/auth-check");
const { body } = require("express-validator");
const { saveAppointment,getAllAppointments,updateAppointmentStatus, validateAppointmentDateTime } =require( "../controllers/appointment");

const router = express.Router();

//GET Appointments
router.get(
    "/appointment",
    authCheck,
    getAllAppointments
  );
  router.post('/appointment/create',saveAppointment);
  router.patch("/appointment/:id", updateAppointmentStatus);
router.get('/isAvailable/:date/:time',validateAppointmentDateTime)
 
  module.exports = router;

