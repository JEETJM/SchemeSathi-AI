import mongoose from "mongoose";

const chatHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    sessionId: {
      type: String,
      default: "guest",
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    profile: {
      age: Number,
      gender: String,
      state: String,
      district: String,
      occupation: String,
      income: Number,
      category: String,
      education: String,
      course: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ChatHistory", chatHistorySchema);