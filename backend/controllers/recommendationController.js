import Scheme from "../models/Scheme.js";

export const getRecommendations = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ score: -1 }).limit(4);

    res.json({
      success: true,
      recommendations: schemes,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Recommendation Error",
    });
  }
};
