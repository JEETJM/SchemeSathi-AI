import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    district: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    occupation: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    course: {
      type: String,
      default: "",
    },

    annualIncome: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: "",
    },

    profileScore: {
      type: Number,
      default: 0,
    },

    savedSchemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
