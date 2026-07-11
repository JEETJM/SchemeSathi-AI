import express from "express";
import { askGemma } from "../services/gemmaService.js";
import { universalSearch } from "../services/universalSearch.js";
import { checkEligibility } from "../services/eligibilityService.js";
import { calculateScore } from "../services/scoreService.js";
import { extractProfile } from "../services/profileExtractor.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Extract User Profile
    const profile = extractProfile(message);

    // 2. Search Database
    const result = await universalSearch(message);

    // 3. Eligibility Check
    const checkedSchemes = checkEligibility(message, result.schemes);

    // 4. Calculate Score for Schemes
    const scoredSchemes = checkedSchemes.map((item) =>
      calculateScore(profile, item),
    );

    // 5. Calculate Score for Scholarships
    const scoredScholarships = result.scholarships.map((item) =>
      calculateScore(profile, item),
    );

    // 6. Sort by Highest Score
    scoredSchemes.sort((a, b) => b.score - a.score);
    scoredScholarships.sort((a, b) => b.score - a.score);

    // 7. AI Prompt
    const prompt = `
You are SchemeSathi AI.

You are an intelligent Government Scheme Recommendation Assistant.

User Profile:
${JSON.stringify(profile, null, 2)}

Government Schemes:
${JSON.stringify(scoredSchemes, null, 2)}

Scholarships:
${JSON.stringify(scoredScholarships, null, 2)}

Rules:

1. Recommend ONLY from the provided database.
2. Never invent any government scheme.
3. Explain WHY the user is eligible.
4. Mention Eligibility Score.
5. Mention Benefits.
6. Mention Required Documents if available.
7. Mention Official Website.
8. If no schemes are available, politely say so.

User Query:
${message}
`;

    // 8. AI Response
    const reply = await askGemma(prompt);

    // 9. Return Response
    res.json({
      success: true,
      profile,
      reply,
      schemes: scoredSchemes,
      scholarships: scoredScholarships,
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
