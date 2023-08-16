export const truncate = (
  fullStr: string,
  strLen: number,
  separator?: string,
  position: "center" | "start" | "end" = "center"
) => {
  if (fullStr.length <= strLen) return fullStr;
  separator = separator || "...";

  const sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  const result =
    position === "end"
      ? fullStr?.substr(0, frontChars) + separator
      : fullStr?.substr(0, frontChars) +
        separator +
        fullStr?.substr(fullStr?.length - backChars);

  return result;
};
