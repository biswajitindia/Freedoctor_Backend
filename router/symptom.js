import express from "express";
import OpenAI from "openai";
import Diagnosis from "../models/symptom.js";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/analyze", async (req, res) => {
  const { patientName, symptoms } = req.body;

  try {
    const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo", // ⬅️ change here
  messages: [
    {
      role: "system",
      content: "You are a helpful medical assistant.",
    },
    {
      role: "user",
      content: `A patient describes these symptoms: ${symptoms}. What are the possible diseases and what should they do?`,
    },
  ],
});


    const result = response.choices[0].message.content;

    const newEntry = new Diagnosis({
      patientName,
      symptoms,
      result,
    });

    await newEntry.save();

    res.json({ success: true, result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "AI analysis failed." });
  }
});

export default router;
