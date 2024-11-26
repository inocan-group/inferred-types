import { LuxonJs, MomentJs } from "inferred-types/types";
import {
  isDate,
  isMoment,
  isIsoDate,
  isLuxonDateTime,
  isIsoDateTime
} from "inferred-types/runtime";

/**
* Provides the week number of a given date.
*
* - if no date is provided, the current date is used
* - if no day of the week is provided, Monday is used as the first day of the week
*/
export const getWeekNumber = <
  T extends string | Record<string,any> | Date
>(
  date: T = new Date() as T,
  weekStartDay: "Sun" | "Mon" = "Mon"
) => {
  /** the offset from the beginning of a week starting on Sunday */
  const offset = weekStartDay === "Mon" ? 1 : 0;
  /** the date normalized to a JS Date object */
  const d = isDate(date)
    ? date
    : isMoment(date)
    ? date.toDate()
    : isLuxonDateTime(date)
    ? new Date(date.toMillis())
    : isIsoDateTime(date)
    ? new Date(date)
    : isIsoDate(date)
    ? new Date(date)
    : new Date();

  /** the first day of the year */
  const yearStart = new Date(d.getFullYear(), 0, 1);
  /** the day of the week for the first day of the year */
  const yearStartDayOfWeek = yearStart.getDay();
  /** the number of days to adjust to the first week start day */
  const daysToWeekStart = (offset - yearStartDayOfWeek + 7) % 7;
  /** the first week start for the year */
  const firstWeekStart = new Date(yearStart);
  firstWeekStart.setDate(yearStart.getDate() + daysToWeekStart);

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffInMs = d.getTime() - firstWeekStart.getTime();
  const diffInDays = Math.floor(diffInMs / msPerDay);

  // Calculate the week number
  let weekNumber = Math.floor(diffInDays / 7) + 1;

  // Adjust for dates before the first week start
  if (weekNumber <= 0) {
    weekNumber = 1;
  }

  return weekNumber;
}
