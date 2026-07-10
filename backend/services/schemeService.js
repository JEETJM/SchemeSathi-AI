import schemes from "../data/schemes.js";

export function findSchemes(message) {
  const text = message.toLowerCase();

  return schemes.filter((scheme) => {
    return (
      text.includes(scheme.category.toLowerCase()) ||
      text.includes(scheme.state.toLowerCase())
    );
  });
}
