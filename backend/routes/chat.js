import express from "express";
import { askGemma } from "../services/gemmaService.js";
import { findSchemes } from "../services/schemeService.js";
import { checkEligibility } from "../services/eligibilityService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Find matching schemes
    const matched = findSchemes(message);

    // Check eligibility
    const checked = checkEligibility(message, matched);

    const prompt = `
You are SchemeSathi AI.

You are an intelligent Government Scheme Assistant.

Rules:

1. Recommend ONLY from the provided schemes.
2. Never invent any scheme.
3. Tell the user which schemes are Eligible.
4. Tell which schemes are Not Eligible.
5. Explain WHY.
6. Give next steps.
7. Reply in beautiful markdown.

User Profile:
${message}

Schemes:
${JSON.stringify(checked, null, 2)}

`;

    const reply = await askGemma(prompt);

    res.json({
      success: true,
      reply,
      matched: checked,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
});

export default router;
