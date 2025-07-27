import jwt from "jsonwebtoken"; 

import express from 'express';
import doctorRoutes from "./router/doctorRoutes.js";
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cors from 'cors';



import authRoutes from './router/authRoutes.js';

dotenv.config();
// mongoconect();
connectDB()

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", doctorRoutes);
app.use("/api", authRoutes);


app.use('/api/auth', authRoutes);
import diagnosisRoutes from './router/symptom.js';
app.use("/api/diagnosis", diagnosisRoutes);


import videoRoutes from './router/video.js';
app.use('/api/video', videoRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`http://localhost:${process.env.PORT}`);
});