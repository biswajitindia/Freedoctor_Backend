// // router/video.js
// import express from 'express';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // Example middleware to check role from JWT
// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains { id, role }
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// // Create room (for doctor only)
// router.post('/create-room', authMiddleware, (req, res) => {
//   if (req.user.role !== 'Doctor') {
//     return res.status(403).json({ error: "Only doctors can create rooms" });
//   }

//   const roomId = `room-${Date.now()}`;
//   res.json({ roomId });
// });

// export default router;

// videoRoutes.js
import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/room/:roomId", verifyToken, (req, res) => {
  const { role } = req.user;

  if (role !== "Doctor" && role !== "Patient") {
    return res.status(403).json({ message: "Access Denied" });
  }

  res.json({
    message: `Welcome to room ${req.params.roomId}`,
    roomId: req.params.roomId,
    role: role,
  });
});

export default router;
