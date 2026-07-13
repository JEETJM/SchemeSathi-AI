console.log("🔥 PROFILE EXTRACTOR LOADED");

const normalize = (text = "") => text.toLowerCase();

export function extractProfile(message) {
  const text = normalize(message);

  const profile = {
    age: null,
    gender: null,
    state: null,
    district: null,
    occupation: null,
    income: null,
    category: null,
    education: null,
    course: null,
  };

  // ==========================
  // AGE
  // ==========================

  let ageMatch =
    text.match(/(\d{1,2})\s*(years?|yrs?)\s*old/) ||
    text.match(/age\s*(is)?\s*(\d{1,2})/) ||
    text.match(/\b(\d{1,2})\b/);

  if (ageMatch) {
    const age = Number(ageMatch[1] || ageMatch[2]);

    if (age >= 15 && age <= 100) {
      profile.age = age;
    }
  }

  // ==========================
  // GENDER
  // ==========================

  if (/\b(male|boy|man)\b/.test(text)) {
    profile.gender = "Male";
  }

  if (/\b(female|girl|woman)\b/.test(text)) {
    profile.gender = "Female";
  }

  // ==========================
  // STATE
  // ==========================

  const states = [
    "West Bengal",
    "Bihar",
    "Jharkhand",
    "Odisha",
    "Delhi",
    "Assam",
    "Tripura",
    "Kerala",
    "Tamil Nadu",
    "Karnataka",
    "Gujarat",
    "Punjab",
    "Rajasthan",
    "Maharashtra",
    "Uttar Pradesh",
    "Madhya Pradesh",
  ];

  for (const state of states) {
    if (text.includes(state.toLowerCase())) {
      profile.state = state;
      break;
    }
  }

  if (text.includes("wb")) {
    profile.state = "West Bengal";
  }

  // ==========================
  // CATEGORY
  // ==========================

  if (text.includes("obc-a")) profile.category = "OBC-A";
  else if (text.includes("obc-b")) profile.category = "OBC-B";
  else if (text.includes("obc")) profile.category = "OBC";
  else if (text.includes("sc")) profile.category = "SC";
  else if (text.includes("st")) profile.category = "ST";
  else if (text.includes("ews")) profile.category = "EWS";
  else if (text.includes("general")) profile.category = "General";

  // ==========================
  // EDUCATION
  // ==========================

  if (
    text.includes("b.tech") ||
    text.includes("btech") ||
    text.includes("b.e") ||
    text.includes("be") ||
    text.includes("engineering") ||
    text.includes("bachelor of technology")
  ) {
    profile.education = "Engineering";
    profile.course = "Engineering";
    profile.occupation = "Student";
  } else if (text.includes("diploma")) {
    profile.education = "Diploma";
    profile.course = "Diploma";
    profile.occupation = "Student";
  } else if (text.includes("ug") || text.includes("undergraduate")) {
    profile.education = "UG";
    profile.occupation = "Student";
  } else if (text.includes("pg") || text.includes("post graduate")) {
    profile.education = "PG";
    profile.occupation = "Student";
  } else if (text.includes("12th") || text.includes("hs")) {
    profile.education = "HS";
  } else if (text.includes("10th") || text.includes("madhyamik")) {
    profile.education = "Secondary";
  }

  if (text.includes("student")) {
    profile.occupation = "Student";
  }

  // ==========================
  // OCCUPATION
  // ==========================

  if (text.includes("farmer")) {
    profile.occupation = "Farmer";
  }

  if (text.includes("business")) {
    profile.occupation = "Business";
  }

  if (text.includes("employee") || text.includes("job")) {
    profile.occupation = "Employee";
  }

  if (text.includes("labour")) {
    profile.occupation = "Labour";
  }

  if (text.includes("unemployed")) {
    profile.occupation = "Unemployed";
  }

  // ==========================
  // INCOME
  // ==========================

  let income = text.match(/(\d+(?:\.\d+)?)\s*lakh/);

  if (income) {
    profile.income = Math.round(Number(income[1]) * 100000);
  }

  if (!profile.income) {
    income = text.match(/(family income|income)\s*(is|=)?\s*₹?\s*([\d,]+)/);

    if (income) {
      profile.income = Number(income[3].replace(/,/g, ""));
    }
  }

  if (!profile.income) {
    income = text.match(/₹\s*([\d,]+)/);

    if (income) {
      profile.income = Number(income[1].replace(/,/g, ""));
    }
  }

  console.log("========== EXTRACTED PROFILE ==========");
  console.log(profile);

  return profile;
}
