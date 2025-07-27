import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Appointment from "../models/appointmentSchema.js";
import verifyToken from "../middleware/authMiddleware.js";
// import { register } from "../controllers/authController.js";
// import { register } from "../controllers/authController.js";








dotenv.config();

const router = express.Router();







// JWT middleware
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };



// authMiddleware.js
// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // attach user info to request
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // export default verifyToken;







// 📅 Book Appointment
router.post("/appointment", async (req, res) => {
  const { username, phoneNo, date, time, message } = req.body;

  if (!username || !phoneNo || !date || !time) {
    return res.status(400).json({ message: "All fields except message are required." });
  }

  try {
    const newAppointment = new Appointment({ username, phoneNo, date, time, message });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🧾 Get Appointments
router.get("/appointment", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
  }
});






router.post("/register", async (req, res) => {
  const { username, Dob, role } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    

    const hashedDob = await bcrypt.hash(Dob, 10);

    const newUser = new User({ username, Dob: hashedDob, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});














// 🔍 Get All Users

router.post("/login", async (req, res) => {
  const { username, Dob, role } = req.body;
  try {
    const user = await User.findOne({ username, role });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare DOB (choose this based on whether DOB is hashed or not)
    const isMatch = await bcrypt.compare(Dob, user.Dob); // If hashed
    // const isMatch = Dob === user.Dob; // If NOT hashed

    if (!isMatch) return res.status(401).json({ message: "Invalid DOB" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user._id,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});







// 📹 Generate Jitsi Room
router.get("/video/room", verifyToken, (req, res) => {
  const roomName = `Room_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const meetingURL = `https://meet.jit.si/${roomName}`;
  res.json({ roomName, meetingURL });
});







export default router;
