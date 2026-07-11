import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";

export async function universalSearch(profile) {
  // Only active records
  const schemes = await Scheme.find({ status: "active" });
  const scholarships = await Scholarship.find({ status: "active" });

  const matchedSchemes = schemes.filter((item) => {
    // ---------- State ----------
    if (
      item.state &&
      item.state !== "All India" &&
      profile.state &&
      item.state.toLowerCase() !== profile.state.toLowerCase()
    ) {
      return false;
    }

    // ---------- Gender ----------
    if (
      item.gender &&
      item.gender !== "Any" &&
      profile.gender &&
      item.gender.toLowerCase() !== profile.gender.toLowerCase()
    ) {
      return false;
    }

    // ---------- Occupation ----------
    if (
      item.occupation &&
      item.occupation !== "Any" &&
      profile.occupation &&
      item.occupation.toLowerCase() !== profile.occupation.toLowerCase()
    ) {
      return false;
    }

    // ---------- Income ----------
    if (
      item.incomeLimit > 0 &&
      profile.income &&
      profile.income > item.incomeLimit
    ) {
      return false;
    }

    // ---------- Category ----------
    if (
      item.category &&
      item.category.length &&
      !item.category.includes("All") &&
      profile.category &&
      !item.category.includes(profile.category)
    ) {
      return false;
    }

    // ---------- Age ----------
    if (profile.age) {
      if (item.ageMin && profile.age < item.ageMin) return false;
      if (item.ageMax && profile.age > item.ageMax) return false;
    }

    // ---------- Education ----------
    if (
      item.education &&
      item.education.length &&
      profile.education &&
      !item.education.includes(profile.education)
    ) {
      return false;
    }

    return true;
  });

  const matchedScholarships = scholarships.filter((item) => {
    if (
      item.state &&
      item.state !== "All India" &&
      profile.state &&
      item.state.toLowerCase() !== profile.state.toLowerCase()
    ) {
      return false;
    }

    if (
      item.gender &&
      item.gender !== "Any" &&
      profile.gender &&
      item.gender.toLowerCase() !== profile.gender.toLowerCase()
    ) {
      return false;
    }

    if (
      item.incomeLimit > 0 &&
      profile.income &&
      profile.income > item.incomeLimit
    ) {
      return false;
    }

    if (
      item.category &&
      item.category.length &&
      !item.category.includes("All") &&
      profile.category &&
      !item.category.includes(profile.category)
    ) {
      return false;
    }

    if (
      item.education &&
      item.education.length &&
      profile.education &&
      !item.education.includes(profile.education)
    ) {
      return false;
    }

    if (profile.age) {
      if (item.ageMin && profile.age < item.ageMin) return false;
      if (item.ageMax && profile.age > item.ageMax) return false;
    }

    return true;
  });

  return {
    schemes: matchedSchemes,
    scholarships: matchedScholarships,
  };
}
