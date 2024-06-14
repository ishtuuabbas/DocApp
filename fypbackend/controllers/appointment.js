

const Appointment = require('../model/appointment');
const nodemailer = require('nodemailer');
const Doctor = require('../model/doctor');


const transporter =  nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'ishtuuabbas786@gmail.com',
    pass:'jgkjlznbcbcadsve'
  }
})

exports.saveAppointment = async (req, res) => {
  try {
    const { name, fatherName, age, gender, address ,phoneNumber, doctor,appointmentDate,appointmentTime,status} = req.body;
console.log("appointment", req.body)
const email = req.body?.email || 'ishuuabbas786@gmail.com'
    const newAppointment = new Appointment({
      name,
      fatherName,
      gender,
      address,
      phoneNumber,  
      age,
      appointmentDate,appointmentTime,status,
      doctor,email
    });
    const mailOptions = {
      from: 'ishtuuabbas786@gmail.com',
      to: [email],
      subject: 'Appointment Created',
      text: `Dear ${name}, your appointment on ${appointmentDate} has been created. `,
    };
    await newAppointment.save();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
    console.log("emal error")
      }
    });
    res.status(201).json({ message: 'Appointment form submitted successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};
exports.getAppointmentById = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment by ID:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};
exports.updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Check if the provided status is valid
  const validStatuses = ["Pending", "Cancelled", "Confirmed"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const appointment = await Appointment.findById(id);
const doctor = await Doctor.findById(appointment.doctor)
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();
    
    const mailOptions = {
      from: 'ishtuuabbas786@gmail.com',
      to: [appointment?.email],
      subject: `Appointment ${status} `,
      text: `Dear ${appointment?.name}, your appointment with Dr. ${doctor.name} on ${appointment.appointmentDate} has been ${status} .`,
    };
    const mailOptionsDoctor = {
      from: 'ishtuuabbas786@gmail.com',
      to: [doctor?.email],
      subject: `Appointment ${status} `,
      text: `Dear  ${doctor?.name}, Patient ${appointment.name}  appointment on ${appointment.appointmentDate} has been ${status}.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
    console.log("email error",error)
      }
    });
    transporter.sendMail(mailOptionsDoctor, (error, info) => {
      if (error) {
    console.log("email error",error)
      }
    });
    res.status(200).json({ message: "Appointment status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.validateAppointmentDateTime = async (req, res) => {
  const { date, time } = req.params;
  console.log('is apointment', date, time,req.params )
  const appointment = await Appointment.findOne({ appointmentDate:date, appointmentTime:time });
 
console.log('dataa',appointment)
  if (!appointment) {
    return res.status(200).json(false);
  } else {
    return res.status(200).json(true);
  }
};