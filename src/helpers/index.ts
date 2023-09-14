import BigNumber from "bignumber.js";
import { format } from "date-fns";

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
  const currentTimestamp = Date.now();
  const currentSeconds = Math.floor(currentTimestamp / 1000);

  return currentSeconds < finishedAt ? true : false
}


export const isPending = (w_pending: any) => {
  return w_pending.toString() > 0 ? true : false
}

export const canWithdraw = (w_pending: any) => {
  const currentTimestamp = Date.now();
  const currentSeconds = Math.floor(currentTimestamp / 1000);

  return currentSeconds > w_pending.toString() ? true : false
}


export const getRemaining = (w_pending: any) => {
  const currentTimestamp = Date.now();
  const currentSeconds = Math.floor(currentTimestamp / 1000);

  const remainingSeconds = w_pending.toString() - currentSeconds;

  const secondsInADay = 24 * 60 * 60; // Number of seconds in a day
  const remainingDays = Math.floor(remainingSeconds / secondsInADay);
  return remainingDays
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

export const getDateFromSeconds = (seconds: any) => {
  const date = format(new Date(seconds * 1000), "yyyy-MM-dd hh:mm a");
  return date
}

export const getNow = () => {
  const currentTimestamp = Date.now();
  const date = format(currentTimestamp, "yyyy-MM-dd hh:mm a");
  return date
}



export const revertMatch = (err: any) => {
  const regex = /execution reverted:\s+"([^"]+)"/;
  const match = err.toString().match(regex);

  return match
}

export const getStakePercent = (x: any, y: any) => {
  return Math.floor(x / y * 100);
}

export const getReward = (totalForStake: any, totalReward: any, balance: any) => {
  const reward = ((balance / totalForStake) * 100) * totalReward / 100
  return reward.toFixed(2);
}