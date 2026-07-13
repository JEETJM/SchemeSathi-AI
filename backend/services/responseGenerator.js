// services/responseGenerator.js

export function generateResponse(profile, schemes = [], scholarships = []) {
  // ==========================
  // Nothing Found
  // ==========================

  if (schemes.length === 0 && scholarships.length === 0) {
    return `Sorry! Based on the information you provided, I couldn't find any government scheme or scholarship matching your profile.

You can try providing more details like:

• Education
• Occupation
• Category
• Annual Family Income
• State

This helps me recommend more accurate schemes.`;
  }

  // ==========================
  // Intro
  // ==========================

  let text = `👋 Hello!\n\n`;

  text += `Good news! Based on the information you provided, I found government schemes and scholarships that match your profile.\n\n`;

  // ==========================
  // Profile
  // ==========================

  text += `📌 Your Profile\n\n`;

  if (profile.age) text += `• Age: ${profile.age}\n`;

  if (profile.gender) text += `• Gender: ${profile.gender}\n`;

  if (profile.state) text += `• State: ${profile.state}\n`;

  if (profile.category) text += `• Category: ${profile.category}\n`;

  if (profile.occupation) text += `• Occupation: ${profile.occupation}\n`;

  if (profile.education) text += `• Education: ${profile.education}\n`;

  if (profile.course) text += `• Course: ${profile.course}\n`;

  if (profile.income)
    text += `• Family Income: ₹${profile.income.toLocaleString()}\n`;

  text += "\n";

  // ==========================
  // Best Scholarship
  // ==========================

  if (scholarships.length > 0) {
    const best = scholarships[0];

    text += `🎓 Best Scholarship Recommendation\n\n`;

    text += `**${best.name}**\n\n`;

    text += `This scholarship is one of the best matches for your profile because`;

    if (profile.state) text += ` you are from ${profile.state}`;

    if (profile.occupation)
      text += ` and you are a ${profile.occupation.toLowerCase()}`;

    if (profile.education) text += ` pursuing ${profile.education}`;

    text += ".\n\n";

    if (best.benefits) text += `Benefits: ${best.benefits}\n`;

    if (best.eligibility) text += `Eligibility: ${best.eligibility}\n`;

    if (best.officialLink) text += `Official Website: ${best.officialLink}\n`;

    text += "\n";
  }

  // ==========================
  // Government Schemes
  // ==========================

  if (schemes.length > 0) {
    text += `📋 Government Schemes You Can Explore\n\n`;

    schemes.forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;

      if (item.benefits) text += `   • Benefits: ${item.benefits}\n`;

      if (item.eligibility) text += `   • Eligibility: ${item.eligibility}\n`;

      if (item.officialLink) text += `   • Apply: ${item.officialLink}\n`;

      text += "\n";
    });
  }

  // ==========================
  // Scholarship List
  // ==========================

  if (scholarships.length > 1) {
    text += `🎓 Other Scholarships\n\n`;

    scholarships.slice(1).forEach((item, index) => {
      text += `${index + 1}. ${item.name}\n`;

      if (item.benefits) text += `   • ${item.benefits}\n`;

      text += "\n";
    });
  }

  // ==========================
  // Closing
  // ==========================

  text += `✅ These recommendations are generated from the official SchemeSathi database based on the information you provided.

Please verify the latest eligibility criteria and application dates on the official websites before applying.

If you want more personalized recommendations, you can also tell me your district, semester, marks percentage, or disability status.`;

  return text;
}
