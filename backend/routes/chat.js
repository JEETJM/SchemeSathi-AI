import express from "express";
import { askGemma } from "../services/gemmaService.js";
import { findSchemes } from "../services/schemeService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  const matched = findSchemes(message);

  let prompt = `

You are SchemeSathi AI.

User:

${message}

Government Schemes:

${JSON.stringify(matched)}

Recommend only from these schemes.

`;

  const reply = await askGemma(prompt);

  res.json({
    reply,

    matched,
  });
});

export default router;
