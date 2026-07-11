import schemes from "../data/schemes.js";

export function findSchemes(message) {

  const text = message.toLowerCase();

  return schemes.filter((scheme) => {

    // State check
    if (
      scheme.state &&
      !text.includes(scheme.state.toLowerCase())
    ) {
      return false;
    }

    // Gender check
    if (scheme.gender === "female") {

      if (
        text.includes("male") ||
        text.includes("man") ||
        text.includes("boy")
      ) {
        return false;
      }

    }

    if (scheme.gender === "male") {

      if (
        text.includes("female") ||
        text.includes("woman") ||
        text.includes("girl")
      ) {
        return false;
      }

    }

    return true;

  });

}