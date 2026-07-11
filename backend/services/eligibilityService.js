export function checkEligibility(message, schemes) {
  const text = message.toLowerCase();

  return schemes.map((scheme) => {
    let eligible = true;
    let reason = "Eligible";

    if (
      scheme.category === "Women" &&
      !text.includes("female") &&
      !text.includes("woman")
    ) {
      eligible = false;
      reason = "Only for Women";
    }

    if (
      scheme.category === "Student" &&
      !text.includes("student") &&
      !text.includes("college") &&
      !text.includes("b.tech")
    ) {
      eligible = false;
      reason = "Only for Students";
    }

    if (scheme.category === "Farmer" && !text.includes("farmer")) {
      eligible = false;
      reason = "Only for Farmers";
    }

    return {
      ...scheme,
      eligible,
      reason,
    };
  });
}
