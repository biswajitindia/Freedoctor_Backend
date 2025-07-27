import express from "express";
const router = express.Router();

// Webhook Verification
router.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "myverifytoken";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Webhook Auto Reply
router.post("/webhook", (req, res) => {
  const body = req.body;

  if (
    body.object &&
    body.entry &&
    body.entry[0].changes &&
    body.entry[0].changes[0].value.messages
  ) {
    const message = body.entry[0].changes[0].value.messages[0];
    const from = message.from; // phone number of user
    const text = message.text.body;

    if (text.toLowerCase() === "hi") {
      sendReply(from, "Thanks! We’ll contact you soon.");
    }
  }

  res.sendStatus(200);
});

const sendReply = async (to, msg) => {
  const axios = await import("axios");

  await axios.default.post(
    "https://graph.facebook.com/v19.0/YOUR_PHONE_NUMBER_ID/messages",
    {
      messaging_product: "whatsapp",
      to,
      text: { body: msg },
    },
    {
      headers: {
        Authorization: "Bearer YOUR_TEMPORARY_ACCESS_TOKEN",
        "Content-Type": "application/json",
      },
    }
  );
};

export default router;
