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
    const result = await universalSearch(profile);
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

    const finalSchemes = scoredSchemes
      .filter((item) => item.score >= 50)
      .slice(0, 5);

    const finalScholarships = scoredScholarships
      .filter((item) => item.score >= 50)
      .slice(0, 5);

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

IMPORTANT RULES

1. Recommend ONLY from the database below.
2. Never invent any Government Scheme.
3. Never invent any Scholarship.
4. Never generate any website.
5. If nothing matches, say "No matching scheme found."
6. Explain only the provided schemes.
7. Do not modify scheme names.

You are SchemeSathi AI.
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

    res.json({
      success: true,
      profile,
      reply,
      schemes: finalSchemes,
      scholarships: finalScholarships,
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
