import Scheme from "../models/Scheme.js";

export async function findSchemes(message) {
  const query = message.toLowerCase();

  const schemes = await Scheme.find();

  return schemes.filter((scheme) => {
    const text = (
      scheme.name +
      " " +
      scheme.category +
      " " +
      scheme.state +
      " " +
      scheme.description +
      " " +
      scheme.eligibility +
      " " +
      scheme.keywords.join(" ")
    ).toLowerCase();

    return query.split(" ").some((word) => text.includes(word));
  });
}
