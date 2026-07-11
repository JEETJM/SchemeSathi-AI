import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    state: String,

    category: String,

    description: String,

    eligibility: String,

    incomeLimit: String,

    gender: String,

    occupation: String,

    benefits: String,

    documents: [String],

    officialLink: String,

    keywords: [String],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Scheme", schemeSchema);
