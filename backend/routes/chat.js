import express from "express";
import crypto from "crypto";

import { askGemma } from "../services/gemmaService.js";
import { universalSearch } from "../services/universalSearch.js";
import { checkEligibility } from "../services/eligibilityService.js";
import { calculateScore } from "../services/scoreService.js";
import { extractProfile } from "../services/profileExtractor.js";
import { generateResponse } from "../services/responseGenerator.js";

import {
  saveUserMessage,
  saveAIMessage,
  buildConversation,
} from "../services/chatMemory.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    const chatSession = sessionId || crypto.randomUUID();

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
    // SAVE USER MESSAGE
    // ======================================

    await saveUserMessage(chatSession, message, profile);

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
    // PREVIOUS CHAT HISTORY
    // ======================================

    const history = await buildConversation(chatSession);

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

You are an intelligent AI assistant for Indian Government Schemes and Scholarships.

Your job is to answer naturally like ChatGPT.

================================================

PREVIOUS CONVERSATION

${history}

================================================

CURRENT USER PROFILE

${JSON.stringify(profile, null, 2)}

================================================

ELIGIBLE GOVERNMENT SCHEMES

${JSON.stringify(finalSchemes, null, 2)}

================================================

ELIGIBLE SCHOLARSHIPS

${JSON.stringify(finalScholarships, null, 2)}

================================================

IMPORTANT RULES

1. Recommend ONLY from the database.

2. Never invent schemes.

3. Never invent scholarships.

4. Remember previous conversation.

5. Answer naturally like ChatGPT.

6. Explain WHY every recommendation matches.

7. Mention Benefits.

8. Mention Eligibility.

9. Mention Official Website.

10. Use headings.

11. Use bullet points.

12. Keep response friendly.

13. Mention the BEST scholarship first.

14. Then recommend schemes.

15. End with a helpful suggestion.

================================================

CURRENT USER QUESTION

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

    // ======================================
    // SAVE AI MESSAGE
    // ======================================

    await saveAIMessage(chatSession, reply);

    console.log("\n========== FINAL REPLY ==========");
    console.log(reply);

    return res.json({
      success: true,
      sessionId: chatSession,
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
