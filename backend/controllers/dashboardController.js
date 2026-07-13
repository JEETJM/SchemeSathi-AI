import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";

// =======================================
// Calculate Profile Score
// =======================================

const calculateProfileScore = (user) => {
  const fields = [
    "fullName",
    "email",
    "phone",
    "age",
    "gender",
    "state",
    "district",
    "category",
    "occupation",
    "education",
    "course",
    "annualIncome",
    "profileImage",
  ];

  let completed = 0;

  fields.forEach((field) => {
    const value = user[field];

    if (value !== undefined && value !== null && value !== "" && value !== 0) {
      completed++;
    }
  });

  return Math.round((completed / fields.length) * 100);
};

// =======================================
// Dashboard
// =======================================

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Total Schemes
    const totalSchemes = await Scheme.countDocuments({
      status: "Active",
    });

    // Total Scholarships
    const totalScholarships = await Scholarship.countDocuments({
      status: "Active",
    });

    // Profile Completion
    const profileScore = calculateProfileScore(user);

    // Save into database
    user.profileScore = profileScore;

    await user.save();

    // Temporary values
    const saved = 0;
    const activity = [];

    res.json({
      success: true,

      stats: {
        totalSchemes,
        totalScholarships,
        saved,
        profileScore,
      },

      user,

      activity,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Dashboard Error",
    });
  }
};
