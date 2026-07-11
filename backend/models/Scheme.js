import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    schemeType: String,

    status: {
      type: String,
      default: "active",
    },

    state: {
      type: String,
      default: "All India",
    },

    district: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "Any",
    },

    occupation: {
      type: String,
      default: "Any",
    },

    category: [String],

    education: [String],

    incomeLimit: {
      type: Number,
      default: 0,
    },

    ageMin: Number,

    ageMax: Number,

    description: String,

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

export default mongoose.model("Scheme", schemeSchema);
