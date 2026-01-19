export const parseItemName = (input: string): string => {
  const tokens: string[] = input.split("-").map((token: string) => {
    return token.charAt(0).toUpperCase() + token.slice(1);
  });
  const formatted: string = tokens.join(" ");
  return formatted.includes("Homework") ? "My " + formatted : formatted;
};
