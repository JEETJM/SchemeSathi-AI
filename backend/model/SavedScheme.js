import mongoose from "mongoose";

const savedSchemeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    schemeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    schemeType: {
      type: String,
      enum: ["Scheme", "Scholarship"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SavedScheme", savedSchemeSchema);
