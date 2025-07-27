import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNo: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  message: { type: String },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
