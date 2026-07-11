export function calculateScore(profile, item) {
  let score = 0;
  const reasons = [];

  // State
  if (
    item.state === "All India" ||
    item.state?.toLowerCase() === profile.state?.toLowerCase()
  ) {
    score += 20;
    reasons.push("State matched");
  }

  // Gender
  if (
    item.gender === "Any" ||
    item.gender?.toLowerCase() === profile.gender?.toLowerCase()
  ) {
    score += 20;
    reasons.push("Gender matched");
  }

  // Occupation
  if (
    item.occupation === "Any" ||
    item.occupation?.toLowerCase() === profile.occupation?.toLowerCase()
  ) {
    score += 20;
    reasons.push("Occupation matched");
  }

  // Income
  if (
    !item.incomeLimit ||
    item.incomeLimit === "No Limit" ||
    profile.income <= item.incomeLimit
  ) {
    score += 20;
    reasons.push("Income matched");
  }

  // Category
  if (
    !item.category ||
    item.category === "Any" ||
    item.category?.toLowerCase().includes(profile.category?.toLowerCase())
  ) {
    score += 20;
    reasons.push("Category matched");
  }

  return {
    ...item._doc,
    score,
    reasons,
  };
}
