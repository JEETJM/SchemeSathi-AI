import Scheme from "../models/Scheme.js";
import Scholarship from "../models/Scholarship.js";

export async function universalSearch(query) {
  const search = query.toLowerCase();

  const schemes = await Scheme.find();

  const scholarships = await Scholarship.find();

  const matchedSchemes = schemes.filter((item) => {
    const text = (
      item.name +
      " " +
      item.category +
      " " +
      item.state +
      " " +
      item.description +
      " " +
      item.keywords.join(" ")
    ).toLowerCase();

    return search.split(" ").some((word) => text.includes(word));
  });

  const matchedScholarships = scholarships.filter((item) => {
    const text = (
      item.name +
      " " +
      item.category +
      " " +
      item.state +
      " " +
      item.eligibility +
      " " +
      item.keywords.join(" ")
    ).toLowerCase();

    return search.split(" ").some((word) => text.includes(word));
  });

  return {
    schemes: matchedSchemes,
    scholarships: matchedScholarships,
  };
}
