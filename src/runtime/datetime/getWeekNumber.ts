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
): number => {
  /** the offset from the beginning of a week starting on Sunday */
  const offset = weekStartDay === "Mon" ? 1 : 0;
  /** the date normalized to a JS Date object */
  const d: Date | undefined = isDate(date)
    ? date
    : isMoment(date)
      ? date.toDate()
      : isLuxonDateTime(date)
        ? new Date(date.toMillis())
        : isIsoDateTime(date)
          ? new Date(date)
          : isIsoDate(date)
            ? new Date(date)
            : undefined;

  if (!d) {
    throw new Error("Invalid date input to getWeekNumber()");
  }

  /** the first day of the year */
  const yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1));
  /** the day of the week for the first day of the year (0-6) */
  const yearStartDayOfWeek = yearStart.getUTCDay();

  // Apply the offset to determine when the first week starts
  const daysToFirstWeek = (7 + yearStartDayOfWeek - offset) % 7;

  // Calculate the first day of week 1
  const firstWeekStart = new Date(yearStart);
  if (daysToFirstWeek <= 3) {
    // If Jan 1 is <= 3 days after week start, it's week 1
    firstWeekStart.setUTCDate(1 - daysToFirstWeek);
  } else {
    // Otherwise, the following week is week 1
    firstWeekStart.setUTCDate(8 - daysToFirstWeek);
  }

  // If the date is before the first week of the year
  if (d < firstWeekStart) {
    // Get the week number from the last week of previous year
    const prevYearDate = new Date(Date.UTC(d.getFullYear() - 1, 11, 31));
    return getWeekNumber(prevYearDate, weekStartDay);
  }

  const msPerDay = 24 * 60 * 60 * 1000;
  const diffInDays = Math.floor((d.getTime() - firstWeekStart.getTime()) / msPerDay);
  const weekNumber = Math.floor(diffInDays / 7) + 1;

  return weekNumber;
}
