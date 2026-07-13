import "dotenv/config";
import axios from "axios";

export async function askGemma(prompt) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log("========== OPENROUTER ERROR ==========");
    console.log(err.response?.data || err.message);

    // ❌ return "AI service temporarily unavailable.";

    // ✅ এটা দাও
    throw err;
  }
}
