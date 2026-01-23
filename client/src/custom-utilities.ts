export const parseItemName = (input: string): string => {
  const tokens: string[] = input.split("-").map((token: string) => {
    return capitalizeFirst(token);
  });
  const formatted: string = tokens.join(" ");
  return formatted.includes("Homework") ? "My " + formatted : formatted;
};

export const capitalizeFirst = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};
