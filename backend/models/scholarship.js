import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    provider: String,

    state: String,

    category: String,

    course: String,

    gender: String,

    incomeLimit: Number,

    eligibility: String,

    benefits: String,

    documents: [String],

    applyStart: String,

    applyEnd: String,

    officialLink: String,

    keywords: [String],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Scholarship", scholarshipSchema);
