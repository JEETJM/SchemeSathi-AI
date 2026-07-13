import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    ministry: {
      type: String,
      default: "",
    },

    schemeType: {
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
      default: "Any",
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

    description: {
      type: String,
      default: "",
    },

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

    applicationMode: {
      type: String,
      default: "Online",
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

export default mongoose.model("Scheme", schemeSchema);
