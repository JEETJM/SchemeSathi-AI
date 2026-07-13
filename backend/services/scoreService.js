const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

export function calculateScore(profile, item) {
  let score = 0;
  const reasons = [];

  // ==========================
  // STATE (20)
  // ==========================

  if (
    !item.state ||
    normalize(item.state) === "all india" ||
    normalize(item.state) === normalize(profile.state)
  ) {
    score += 20;
    reasons.push("State matched");
  }

  // ==========================
  // GENDER (10)
  // ==========================

  if (
    !item.gender ||
    normalize(item.gender) === "any" ||
    normalize(item.gender) === normalize(profile.gender)
  ) {
    score += 10;
    reasons.push("Gender matched");
  }

  // ==========================
  // OCCUPATION (20)
  // ==========================

  if (
    !item.occupation ||
    normalize(item.occupation) === "any" ||
    normalize(item.occupation) === normalize(profile.occupation)
  ) {
    score += 20;
    reasons.push("Occupation matched");
  }

  // ==========================
  // CATEGORY (15)
  // ==========================

  if (
    !item.category ||
    item.category.length === 0 ||
    item.category.some(
      (c) =>
        normalize(c) === "all" || normalize(c) === normalize(profile.category),
    )
  ) {
    score += 15;
    reasons.push("Category matched");
  }

  // ==========================
  // EDUCATION (15)
  // ==========================

  if (
    !item.education ||
    item.education.length === 0 ||
    item.education.some((e) => normalize(e) === normalize(profile.education))
  ) {
    score += 15;
    reasons.push("Education matched");
  }

  // ==========================
  // COURSE BONUS (5)
  // ==========================

  if (
    item.course &&
    item.course.length > 0 &&
    profile.course &&
    item.course.some((c) => normalize(c) === normalize(profile.course))
  ) {
    score += 5;
    reasons.push("Course matched");
  }

  // ==========================
  // INCOME (10)
  // ==========================

  if (
    !item.incomeLimit ||
    item.incomeLimit === 0 ||
    profile.income <= item.incomeLimit
  ) {
    score += 10;
    reasons.push("Income matched");
  }

  // ==========================
  // AGE (5)
  // ==========================

  if (
    profile.age &&
    profile.age >= (item.ageMin || 0) &&
    profile.age <= (item.ageMax || 150)
  ) {
    score += 5;
    reasons.push("Age matched");
  }

  // ==========================
  // KEYWORD BONUS (10)
  // ==========================

  if (item.keywords && item.keywords.length > 0) {
    let matched = false;

    for (const key of item.keywords) {
      const k = normalize(key);

      if (profile.education && k.includes(normalize(profile.education)))
        matched = true;

      if (profile.course && k.includes(normalize(profile.course)))
        matched = true;

      if (profile.occupation && k.includes(normalize(profile.occupation)))
        matched = true;

      if (profile.category && k.includes(normalize(profile.category)))
        matched = true;
    }

    if (matched) {
      score += 10;
      reasons.push("Keyword matched");
    }
  }

  // ==========================
  // ELIGIBILITY BONUS
  // ==========================

  if (item.eligible) {
    score += 5;
    reasons.push("Eligible");
  }

  if (score > 100) score = 100;

  return {
    ...(item._doc || item),
    score,
    reasons,
  };
}
