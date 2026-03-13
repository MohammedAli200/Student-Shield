import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/message", async (req, res) => {

  try {

    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    res.json({
      reply: reply
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "AI response failed"
    });

  }

});

export default router;