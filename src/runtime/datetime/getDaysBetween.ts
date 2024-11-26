import {  LuxonJs, MomentJs } from "inferred-types/types";
import { asDate } from "./asDate";

/**
* Provides the number of days between two dates.
*
* - if the second date is left out, the current date is used
*/
export const getDaysBetween = <
  A extends string | MomentJs | Date | LuxonJs["DateTime"],
  B extends string | MomentJs | Date | LuxonJs["DateTime"],
>(
  a: A,
  b: B = new Date() as B
): number => {
  const aDate = asDate(a);
  const bDate = asDate(b);


  // Normalize both dates to UTC midnight to ignore timezones
  const utcA = new Date(
    Date.UTC(aDate.getUTCFullYear(),
      aDate.getUTCMonth(),
      aDate.getUTCDate())
  );
  const utcB = new Date(
    Date.UTC(
      bDate.getUTCFullYear(),
      bDate.getUTCMonth(),
      bDate.getUTCDate())
  );

  // Calculate the difference in milliseconds and convert to days
  const msInDay = 24 * 60 * 60 * 1000;
  return Math.abs((utcA.getTime() - utcB.getTime()) / msInDay);
};
