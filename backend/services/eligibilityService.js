// services/eligibilityService.js

export function checkEligibility(profile, schemes = []) {
  return schemes.map((scheme) => {
    let eligible = true;
    let reason = "Eligible";

    // ==========================
    // STATE
    // ==========================
    if (
      scheme.state &&
      scheme.state !== "All India" &&
      profile.state &&
      scheme.state.toLowerCase() !== profile.state.toLowerCase()
    ) {
      eligible = false;
      reason = "State not matched";
    }

    // ==========================
    // GENDER
    // ==========================
    if (
      eligible &&
      scheme.gender &&
      scheme.gender !== "Any" &&
      profile.gender &&
      scheme.gender.toLowerCase() !== profile.gender.toLowerCase()
    ) {
      eligible = false;
      reason = "Gender not matched";
    }

    // ==========================
    // OCCUPATION
    // ==========================
    if (
      eligible &&
      scheme.occupation &&
      scheme.occupation !== "Any" &&
      profile.occupation &&
      scheme.occupation.toLowerCase() !== profile.occupation.toLowerCase()
    ) {
      eligible = false;
      reason = "Occupation not matched";
    }

    // ==========================
    // CATEGORY
    // ==========================
    if (
      eligible &&
      Array.isArray(scheme.category) &&
      scheme.category.length > 0 &&
      !scheme.category.includes("All") &&
      profile.category &&
      !scheme.category.includes(profile.category)
    ) {
      eligible = false;
      reason = "Category not matched";
    }

    // ==========================
    // AGE
    // ==========================
    if (eligible && profile.age) {
      if (scheme.ageMin && profile.age < scheme.ageMin) {
        eligible = false;
        reason = "Age below minimum";
      }

      if (scheme.ageMax && profile.age > scheme.ageMax) {
        eligible = false;
        reason = "Age above maximum";
      }
    }

    // ==========================
    // INCOME
    // ==========================
    if (
      eligible &&
      scheme.incomeLimit &&
      scheme.incomeLimit > 0 &&
      profile.income &&
      profile.income > scheme.incomeLimit
    ) {
      eligible = false;
      reason = "Income exceeds limit";
    }

    // ==========================
    // EDUCATION
    // ==========================
    if (
      eligible &&
      Array.isArray(scheme.education) &&
      scheme.education.length > 0 &&
      profile.education &&
      !scheme.education.includes(profile.education)
    ) {
      eligible = false;
      reason = "Education not matched";
    }

    return {
      ...scheme,
      eligible,
      reason,
    };
  });
}
