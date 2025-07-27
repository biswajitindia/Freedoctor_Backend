import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
  patientName: String,
  symptoms: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Diagnosis", diagnosisSchema);
