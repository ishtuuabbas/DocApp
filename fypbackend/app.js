const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

require("dotenv").config();
const userRoutes = require("./routes/user");
const patientsRoutes = require("./routes/patient");
const recordRoutes = require("./routes/record");
const doctorRoutes = require("./routes/doctor");
const contactRoutes = require('./routes/contact');
const appointmentRoutes = require('./routes/appointment');

app.use(bodyParser.json());

app.use("/api", userRoutes);
app.use("/api", patientsRoutes);
app.use("/api", doctorRoutes);
app.use("/api", recordRoutes);
app.use('/api',contactRoutes);
app.use('/api',appointmentRoutes);


app.use((error, req, res, next) => {
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(process.env.MONGODB_SECRET_KEY)
  .then((result) => {
    console.log("db connected, listing to 8080")
    app.listen(8080);
  })
  .catch((err) => console.log(err));
