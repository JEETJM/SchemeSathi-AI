export function extractProfile(message) {
  const text = message.toLowerCase();

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

  // =====================
  // AGE
  // =====================
  const ageMatch = text.match(/\b(\d{1,2})\b/);

  if (ageMatch) {
    const age = Number(ageMatch[1]);

    if (age >= 15 && age <= 100) {
      profile.age = age;
    }
  }

  // =====================
  // GENDER
  // =====================

  if (
    text.includes("male") ||
    text.includes("boy") ||
    text.includes("man") ||
    text.includes("gentleman")
  ) {
    profile.gender = "Male";
  }

  if (
    text.includes("female") ||
    text.includes("girl") ||
    text.includes("woman") ||
    text.includes("lady")
  ) {
    profile.gender = "Female";
  }

  // =====================
  // OCCUPATION
  // =====================

  if (
    text.includes("student") ||
    text.includes("college") ||
    text.includes("school") ||
    text.includes("university")
  ) {
    profile.occupation = "Student";
  }

  if (text.includes("farmer") || text.includes("agriculture")) {
    profile.occupation = "Farmer";
  }

  if (
    text.includes("business") ||
    text.includes("shop") ||
    text.includes("startup")
  ) {
    profile.occupation = "Business";
  }

  if (
    text.includes("employee") ||
    text.includes("job") ||
    text.includes("private job") ||
    text.includes("government employee")
  ) {
    profile.occupation = "Employee";
  }

  if (text.includes("unemployed")) {
    profile.occupation = "Unemployed";
  }

  // =====================
  // EDUCATION
  // =====================

  if (text.includes("b.tech") || text.includes("btech")) {
    profile.education = "B.Tech";
    profile.course = "Engineering";
  }

  if (text.includes("diploma")) {
    profile.education = "Diploma";
  }

  if (text.includes("graduation") || text.includes("graduate")) {
    profile.education = "Graduation";
  }

  if (text.includes("post graduation") || text.includes("masters")) {
    profile.education = "Post Graduation";
  }

  // =====================
  // CATEGORY
  // =====================

  if (text.includes("obc-a")) profile.category = "OBC-A";
  else if (text.includes("obc-b")) profile.category = "OBC-B";
  else if (text.includes("obc")) profile.category = "OBC";
  else if (text.includes("sc")) profile.category = "SC";
  else if (text.includes("st")) profile.category = "ST";
  else if (text.includes("ews")) profile.category = "EWS";
  else if (text.includes("general")) profile.category = "General";

  // =====================
  // STATES
  // =====================

  const states = [
    "West Bengal",
    "Bihar",
    "Jharkhand",
    "Odisha",
    "Assam",
    "Tripura",
    "Delhi",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Kerala",
    "Gujarat",
    "Rajasthan",
    "Punjab",
    "Haryana",
    "Uttar Pradesh",
    "Madhya Pradesh",
    "Chhattisgarh",
    "Telangana",
    "Andhra Pradesh",
  ];

  for (const state of states) {
    if (text.includes(state.toLowerCase())) {
      profile.state = state;
      break;
    }
  }

  // =====================
  // INCOME
  // =====================

  let incomeMatch = text.match(/(\d+(\.\d+)?)\s*lakh/);

  if (incomeMatch) {
    profile.income = Number(incomeMatch[1]) * 100000;
  }

  incomeMatch = text.match(/₹?\s?(\d+)\s*rs/);

  if (!profile.income && incomeMatch) {
    profile.income = Number(incomeMatch[1]);
  }

  incomeMatch = text.match(/income\s*(is|=)?\s*(\d+)/);

  if (!profile.income && incomeMatch) {
    profile.income = Number(incomeMatch[2]);
  }

  return profile;
}
