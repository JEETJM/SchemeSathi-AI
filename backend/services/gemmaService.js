import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMMA_API_KEY,
});

export async function askGemma(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    console.log(response);

    return response.text;
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
    throw err;
  }
}
