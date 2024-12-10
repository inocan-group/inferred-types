import { asDate, getWeekNumber } from "inferred-types/runtime";

/**
 * Provides a boolean check on the `val` passed in to see if:
 *  a) it's a date or date-time representation
 *  b) the date is in the same as the current week
 *
 * This function will work with ISO 8601 strings, JS Date objects,
 * Luxon DateTime objects, and Moment.js objects.
 */
export function isThisWeek<T extends number | string | Date | Record<string, any>>(date: T): boolean {
  const targetDate = asDate(date);

  if (!targetDate) {
    return false;
  }

  const currentWeek = getWeekNumber();
  const targetWeek = getWeekNumber(targetDate);

  return currentWeek === targetWeek;
}
