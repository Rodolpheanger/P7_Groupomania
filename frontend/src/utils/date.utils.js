export const dateParser = (dateToParse) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    // weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const timestamp = Date.parse(dateToParse);

  const parsedDate = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return parsedDate.toString();
};
