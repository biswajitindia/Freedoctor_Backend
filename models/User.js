

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  Dob: { type: String, required: true }, // Hashed DOB
  role: { type: String, enum: ["patient", "doctor"], required: true },
});




export default mongoose.model("User", userSchema); 


