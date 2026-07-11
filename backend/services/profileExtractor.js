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
    course: null,
  };

  // Age
  const age = text.match(/\b(\d{2})\b/);
  if (age) profile.age = Number(age[1]);

  // Gender
  if (text.includes("male")) profile.gender = "Male";
  if (text.includes("female")) profile.gender = "Female";

  // Student
  if (
    text.includes("student") ||
    text.includes("college") ||
    text.includes("b.tech") ||
    text.includes("engineering")
  ) {
    profile.occupation = "Student";
  }

  // Farmer
  if (text.includes("farmer")) {
    profile.occupation = "Farmer";
  }

  // State
  if (text.includes("west bengal")) profile.state = "West Bengal";

  if (text.includes("bihar")) profile.state = "Bihar";

  if (text.includes("assam")) profile.state = "Assam";

  // Category
  if (text.includes("obc")) profile.category = "OBC";

  if (text.includes("sc")) profile.category = "SC";

  if (text.includes("st")) profile.category = "ST";

  // Course
  if (text.includes("b.tech")) profile.course = "B.Tech";

  // Income
  const income = text.match(/\d+\s?lakh/);

  if (income) {
    profile.income = parseFloat(income[0]) * 100000;
  }

  return profile;
}
