import express from "express";

import { askGemma } from "../services/gemmaService.js";
import { universalSearch } from "../services/universalSearch.js";
import { checkEligibility } from "../services/eligibilityService.js";
import { calculateScore } from "../services/scoreService.js";
import { extractProfile } from "../services/profileExtractor.js";
import { generateResponse } from "../services/responseGenerator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    console.log("\n======================================");
    console.log("USER MESSAGE");
    console.log(message);

    // ======================================
    // PROFILE
    // ======================================

    const profile = extractProfile(message);

    console.log("\nPROFILE");
    console.log(profile);

    // ======================================
    // SEARCH DATABASE
    // ======================================

    const result = await universalSearch(profile);

    console.log("\nFOUND SCHEMES :", result.schemes.length);
    console.log("FOUND SCHOLARSHIPS :", result.scholarships.length);

    // ======================================
    // ELIGIBILITY
    // ======================================

    const eligibleSchemes = checkEligibility(profile, result.schemes).filter(
      (x) => x.eligible,
    );

    const eligibleScholarships = checkEligibility(
      profile,
      result.scholarships,
    ).filter((x) => x.eligible);

    console.log("ELIGIBLE SCHEMES :", eligibleSchemes.length);
    console.log("ELIGIBLE SCHOLARSHIPS :", eligibleScholarships.length);

    // ======================================
    // SCORE
    // ======================================

    const finalSchemes = eligibleSchemes
      .map((item) => calculateScore(profile, item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const finalScholarships = eligibleScholarships
      .map((item) => calculateScore(profile, item))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    console.log("\n========== FINAL SCHEMES ==========");

    finalSchemes.forEach((x) => {
      console.log(`${x.name} (${x.score}%)`);
    });

    console.log("\n========== FINAL SCHOLARSHIPS ==========");

    finalScholarships.forEach((x) => {
      console.log(`${x.name} (${x.score}%)`);
    });

    // ======================================
    // AI RESPONSE
    // ======================================

    let reply = "";

    if (finalSchemes.length === 0 && finalScholarships.length === 0) {
      reply =
        "Sorry! No matching schemes or scholarships were found for your profile.";
    } else {
      try {
        const prompt = `
You are SchemeSathi AI.

Your job is to recommend ONLY the schemes and scholarships provided below.

Never invent any scheme.

Never invent any scholarship.

Explain naturally like ChatGPT.

----------------------------------

USER PROFILE

Age : ${profile.age}

Gender : ${profile.gender}

State : ${profile.state}

Category : ${profile.category}

Occupation : ${profile.occupation}

Education : ${profile.education}

Course : ${profile.course}

Income : ₹${profile.income}

----------------------------------

Government Schemes

${JSON.stringify(finalSchemes, null, 2)}

----------------------------------

Scholarships

${JSON.stringify(finalScholarships, null, 2)}

----------------------------------

Instructions

1. Introduce briefly.

2. Explain why the user matches.

3. Mention best scholarship first.

4. Mention best schemes afterwards.

5. Mention benefits.

6. Mention official website if available.

7. Do NOT invent anything.

8. Friendly English.

9. Use bullet points.

10. End with wishing good luck.

User Question

${message}
`;

        reply = await askGemma(prompt);

        if (!reply || reply.trim() === "") {
          reply = generateResponse(profile, finalSchemes, finalScholarships);
        }
      } catch (err) {
        console.log("\n========== AI FAILED ==========");
        console.log(err.message);

        reply = generateResponse(profile, finalSchemes, finalScholarships);
      }
    }

    console.log("\n========== FINAL REPLY ==========");
    console.log(reply);

    return res.json({
      success: true,
      profile,
      reply,
      schemes: finalSchemes,
      scholarships: finalScholarships,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default router;
