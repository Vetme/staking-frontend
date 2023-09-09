import BigNumber from "bignumber.js";


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


// Converters 


export const fromBigNumber = (value: string, decimalPlaces: number) => {
  const weiBN = new BigNumber(value);
  const etherValue = weiBN.dividedBy(new BigNumber(10).exponentiatedBy(decimalPlaces));
  return etherValue.toNumber()
}



export const getStatus = (finishedAt: number) => {
  const currentDate = new Date();
  const currentSeconds = currentDate.getSeconds();

  return currentSeconds > finishedAt ? true : false
}



export const getIMonth = (duration: number) => {

  if (duration < 60) {
    return duration + "Seconds"
  } else if (duration >= 3600) {
    return duration / 60 + " minute"
  }
  else if (duration >= 86400) {
    return duration / 86400 + " Day(s)";
  } else {
    return duration / 2628000 + "Month(s)";
  }

}


export const revertMatch = (err:any) => {
  const regex = /execution reverted:\s+"([^"]+)"/;
  const match = err.toString().match(regex);

  return match
}