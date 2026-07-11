import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";
import SavedScheme from "../models/SavedScheme.js";
import ChatHistory from "../models/ChatHistory.js";

export const getDashboard = async (req, res) => {
  try {
    const totalSchemes = await Scheme.countDocuments();

    const totalScholarships = await Scholarship.countDocuments();

    const saved = await SavedScheme.countDocuments({
      user: req.user._id,
    });

    const chats = await ChatHistory.countDocuments({
      user: req.user._id,
    });

    const profile = await User.findById(req.user._id);

    res.json({
      success: true,

      stats: {
        totalSchemes,
        totalScholarships,
        saved,
        chats,
        profileScore: profile.profileScore,
      },

      user: profile,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Dashboard Error",
    });
  }
};
