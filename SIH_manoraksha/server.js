// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Load OpenAI with API Key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // ✅ Secure: use .env file
});

// API endpoint for chatbot
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a supportive psychological support chatbot for students." },
        { role: "user", content: userMessage }
      ]
    });

    const botReply = response.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a reply.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).json({ error: "Something went wrong with the chatbot" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
