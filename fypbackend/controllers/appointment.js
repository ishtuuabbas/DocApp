

const Appointment = require('../model/appointment');
exports.saveAppointment = async (req, res) => {
  try {
    const { name, fatherName, age, gender, address ,phoneNumber, doctor,appointmentDate,appointmentTime,status} = req.body;
console.log("appointment", req.body)

    const newAppointment = new Appointment({
      name,
      fatherName,
      gender,
      address,
      phoneNumber,
      age,
      appointmentDate,appointmentTime,status,
      doctor
    });
    await newAppointment.save();

    res.status(201).json({ message: 'Appointment form submitted successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
};



exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
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

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Appointment status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};