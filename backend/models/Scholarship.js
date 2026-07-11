import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    provider: String,

    status: {
      type: String,
      default: "active",
    },

    state: {
      type: String,
      default: "All India",
    },

    gender: {
      type: String,
      default: "Any",
    },

    category: [String],

    education: [String],

    course: [String],

    occupation: {
      type: String,
      default: "Student",
    },

    incomeLimit: {
      type: Number,
      default: 0,
    },

    ageMin: Number,

    ageMax: Number,

    eligibility: String,

    benefits: String,

    documents: [String],

    officialLink: String,

    keywords: [String],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Scholarship", scholarshipSchema);
