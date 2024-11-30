import {
  asDate,
  getDaysBetween
} from "inferred-types/runtime";

/**
* Provides the ISO week number of a given date.
*
* - if no date is provided, the current date is used
* - an ISO week always starts on Monday
* - numerically an ISO week will be between 1 and 53
*     - 52 is max for most years
*     - those years which start on a Thursday or
* years with a leap day and start on a Wednesday get 53
*/
export const getWeekNumber = <
  T extends string | Record<string, any> | Date
>(
  date: T = new Date() as T
): number => {
  let d = asDate(date);

  if(!d) {
    throw new Error(`invalid date passed into getWeekNumber${String(date)}`);
  }

  const daysIntoYear = getDaysBetween(new Date(d.getFullYear(), 0,1), d);
  const week = Math.floor(daysIntoYear / 7) + 1;

  return week;
};
