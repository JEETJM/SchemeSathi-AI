import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    provider: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "Active",
    },

    // =========================
    // ELIGIBILITY
    // =========================

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
      default: "Student",
    },
    category: {
      type: [String],
      default: [],
    },

    education: {
      type: [String],
      default: [],
    },

    course: {
      type: [String],
      default: [],
    },

    incomeLimit: {
      type: Number,
      default: 0,
    },

    ageMin: {
      type: Number,
      default: 0,
    },

    ageMax: {
      type: Number,
      default: 100,
    },

    // =========================
    // DETAILS
    // =========================

    eligibility: {
      type: String,
      default: "",
    },

    benefits: {
      type: String,
      default: "",
    },

    documents: {
      type: [String],
      default: [],
    },

    officialLink: {
      type: String,
      default: "",
    },

    applyStart: {
      type: String,
      default: "",
    },

    applyEnd: {
      type: String,
      default: "",
    },

    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Scholarship", scholarshipSchema);
