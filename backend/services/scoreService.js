export function calculateScore(profile, item) {
  let score = 0;
  const reasons = [];

  // =====================
  // STATE (25)
  // =====================
  if (
    item.state === "All India" ||
    (profile.state && item.state?.toLowerCase() === profile.state.toLowerCase())
  ) {
    score += 25;
    reasons.push("State matched");
  }

  // =====================
  // GENDER (15)
  // =====================
  if (
    item.gender === "Any" ||
    (profile.gender &&
      item.gender?.toLowerCase() === profile.gender.toLowerCase())
  ) {
    score += 15;
    reasons.push("Gender matched");
  }

  // =====================
  // OCCUPATION (20)
  // =====================
  if (
    item.occupation === "Any" ||
    (profile.occupation &&
      item.occupation?.toLowerCase() === profile.occupation.toLowerCase())
  ) {
    score += 20;
    reasons.push("Occupation matched");
  }

  // =====================
  // CATEGORY (15)
  // =====================
  if (
    !item.category ||
    item.category.includes("All") ||
    (profile.category && item.category.includes(profile.category))
  ) {
    score += 15;
    reasons.push("Category matched");
  }

  // =====================
  // EDUCATION (15)
  // =====================
  if (
    !item.education ||
    item.education.length === 0 ||
    (profile.education && item.education.includes(profile.education))
  ) {
    score += 15;
    reasons.push("Education matched");
  }

  // =====================
  // INCOME (10)
  // =====================
  if (
    !item.incomeLimit ||
    item.incomeLimit === 0 ||
    (profile.income && profile.income <= item.incomeLimit)
  ) {
    score += 10;
    reasons.push("Income matched");
  }

  // =====================
  // AGE BONUS
  // =====================
  if (profile.age) {
    if (
      (!item.ageMin || profile.age >= item.ageMin) &&
      (!item.ageMax || profile.age <= item.ageMax)
    ) {
      score += 5;
      reasons.push("Age matched");
    }
  }

  if (score > 100) score = 100;

  return {
    ...item._doc,
    score,
    reasons,
  };
}
