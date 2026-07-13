import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";

const normalize = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

function matchValue(dbValue, userValue, anyWord = "any") {
  if (!userValue) return true;
  if (!dbValue) return true;

  // DATABASE VALUE ARRAY
  if (Array.isArray(dbValue)) {
    if (dbValue.length === 0) return true;

    return dbValue.some((item) => {
      const val = normalize(item);

      return (
        val === normalize(userValue) ||
        val === "all" ||
        val === normalize(anyWord) ||
        val.includes(normalize(userValue)) ||
        normalize(userValue).includes(val)
      );
    });
  }

  // DATABASE VALUE STRING

  const db = normalize(dbValue);
  const user = normalize(userValue);

  return (
    db === "all" ||
    db === normalize(anyWord) ||
    db === user ||
    db.includes(user) ||
    user.includes(db)
  );
}

export async function universalSearch(profile) {
  const schemes = await Scheme.find({
    status: { $regex: /^active$/i },
  });

  const scholarships = await Scholarship.find({
    status: { $regex: /^active$/i },
  });

  console.log("\n===============================");
  console.log("PROFILE");
  console.log(profile);

  console.log("TOTAL SCHEMES:", schemes.length);
  console.log("TOTAL SCHOLARSHIPS:", scholarships.length);

  // ===============================
  // SCHEMES
  // ===============================

  const matchedSchemes = schemes.filter((item) => {
    if (
      profile.state &&
      normalize(item.state) !== "all india" &&
      !matchValue(item.state, profile.state)
    ) {
      return false;
    }

    if (!matchValue(item.gender, profile.gender)) {
      return false;
    }

    if (!matchValue(item.occupation, profile.occupation)) {
      return false;
    }

    if (!matchValue(item.category, profile.category, "all")) {
      return false;
    }

    if (!matchValue(item.education, profile.education)) {
      return false;
    }

    if (!matchValue(item.course, profile.course)) {
      return false;
    }

    if (profile.age && item.ageMin && profile.age < Number(item.ageMin)) {
      return false;
    }

    if (profile.age && item.ageMax && profile.age > Number(item.ageMax)) {
      return false;
    }

    if (
      profile.income &&
      item.incomeLimit &&
      Number(item.incomeLimit) > 0 &&
      profile.income > Number(item.incomeLimit)
    ) {
      return false;
    }

    return true;
  });

  // ===============================
  // SCHOLARSHIPS
  // ===============================

  const matchedScholarships = scholarships.filter((item) => {
    if (
      profile.state &&
      normalize(item.state) !== "all india" &&
      !matchValue(item.state, profile.state)
    ) {
      return false;
    }

    if (!matchValue(item.gender, profile.gender)) {
      return false;
    }

    if (!matchValue(item.occupation, profile.occupation)) {
      return false;
    }

    if (!matchValue(item.category, profile.category, "all")) {
      return false;
    }

    if (!matchValue(item.education, profile.education)) {
      return false;
    }

    if (!matchValue(item.course, profile.course)) {
      return false;
    }

    if (profile.age && item.ageMin && profile.age < Number(item.ageMin)) {
      return false;
    }

    if (profile.age && item.ageMax && profile.age > Number(item.ageMax)) {
      return false;
    }

    if (
      profile.income &&
      item.incomeLimit &&
      Number(item.incomeLimit) > 0 &&
      profile.income > Number(item.incomeLimit)
    ) {
      return false;
    }

    return true;
  });

  console.log("\n===============================");
  console.log("MATCHED SCHEMES");

  matchedSchemes.forEach((x) => {
    console.log("✅", x.name);
  });

  console.log("\nMATCHED SCHOLARSHIPS");

  matchedScholarships.forEach((x) => {
    console.log("🎓", x.name);
  });

  console.log("\nTOTAL MATCHED SCHEMES:", matchedSchemes.length);
  console.log("TOTAL MATCHED SCHOLARSHIPS:", matchedScholarships.length);

  return {
    schemes: matchedSchemes,
    scholarships: matchedScholarships,
  };
}
