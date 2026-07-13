import ChatHistory from "../models/ChatHistory.js";

// ==============================
// Save User Message
// ==============================

export async function saveUserMessage(sessionId, message, profile = {}) {
  try {
    await ChatHistory.create({
      sessionId,
      role: "user",
      message,
      profile,
    });
  } catch (err) {
    console.log("Save User Error:", err.message);
  }
}

// ==============================
// Save AI Message
// ==============================

export async function saveAIMessage(sessionId, message) {
  try {
    await ChatHistory.create({
      sessionId,
      role: "assistant",
      message,
    });
  } catch (err) {
    console.log("Save AI Error:", err.message);
  }
}

// ==============================
// Last Conversation
// ==============================

export async function getConversation(sessionId) {
  try {
    const chats = await ChatHistory.find({
      sessionId,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    return chats.reverse();
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

// ==============================
// Build Prompt
// ==============================

export async function buildConversation(sessionId) {
  const chats = await getConversation(sessionId);

  let history = "";

  chats.forEach((chat) => {
    if (chat.role === "user") {
      history += `User: ${chat.message}\n`;
    } else {
      history += `Assistant: ${chat.message}\n`;
    }
  });

  return history;
}

// ==============================
// Clear Conversation
// ==============================

export async function clearConversation(sessionId) {
  try {
    await ChatHistory.deleteMany({
      sessionId,
    });
  } catch (err) {
    console.log(err.message);
  }
}
