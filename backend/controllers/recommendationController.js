import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";

const normalize = (value = "") => String(value).trim().toLowerCase();

function calculateMatch(user, item) {
  let score = 0;

  // =====================
  // STATE
  // =====================

  if (
    normalize(item.state) === "all india" ||
    normalize(item.state) === normalize(user.state)
  ) {
    score += 20;
  }

  // =====================
  // GENDER
  // =====================

  if (
    !item.gender ||
    normalize(item.gender) === "any" ||
    normalize(item.gender) === normalize(user.gender)
  ) {
    score += 10;
  }

  // =====================
  // OCCUPATION
  // =====================

  if (
    !item.occupation ||
    normalize(item.occupation) === "any" ||
    normalize(item.occupation) === normalize(user.occupation)
  ) {
    score += 20;
  }

  // =====================
  // CATEGORY
  // =====================

  if (
    !item.category ||
    item.category.length === 0 ||
    item.category.includes("All") ||
    item.category.includes(user.category)
  ) {
    score += 15;
  }

  // =====================
  // EDUCATION
  // =====================

  if (
    !item.education ||
    item.education.length === 0 ||
    item.education.includes(user.education)
  ) {
    score += 15;
  }

  // =====================
  // INCOME
  // =====================

  if (
    !item.incomeLimit ||
    item.incomeLimit === 0 ||
    user.annualIncome <= item.incomeLimit
  ) {
    score += 10;
  }

  // =====================
  // AGE
  // =====================

  if (
    (!item.ageMin || user.age >= item.ageMin) &&
    (!item.ageMax || user.age <= item.ageMax)
  ) {
    score += 10;
  }

  return score;
}

export const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const schemes = await Scheme.find({
      status: "Active",
    });

    const scholarships = await Scholarship.find({
      status: "Active",
    });

    const schemeRecommendations = schemes
      .map((scheme) => ({
        ...scheme.toObject(),
        type: "Scheme",
        score: calculateMatch(user, scheme),
      }))
      .filter((item) => item.score >= 40);

    const scholarshipRecommendations = scholarships
      .map((item) => ({
        ...item.toObject(),
        type: "Scholarship",
        score: calculateMatch(user, item),
      }))
      .filter((item) => item.score >= 40);

    const recommendations = [
      ...schemeRecommendations,
      ...scholarshipRecommendations,
    ]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json({
      success: true,
      total: recommendations.length,
      recommendations,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Recommendation Error",
    });
  }
};
