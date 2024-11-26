import { isIsoDateTime } from "./isDateTime";
import { isIsoDate } from "./isIsoDate";
import { isLuxonDateTime } from "./isLuxonDateTime";
import { isMoment } from "./isMoment";


/**
* Provides a boolean check on the `val` passed in to see if:
*  a) it's a date or date-time representation
*  b) the date is in the same as the current week
*
* This function will work with ISO 8601 strings, JS Date objects,
* Luxon DateTime objects, and Moment.js objects.
*/
export const isThisWeek = (
  date: unknown,
  weekStart: "Sun" | "Mon" = "Mon"
): boolean => {
  // Get current date
  const now = new Date();
  let targetDate: Date;

  // Convert input to Date object based on its type
  if (date instanceof Date) {
    targetDate = date;
  } else if (isMoment(date)) {
    targetDate = date.toDate();
  } else if (isLuxonDateTime(date)) {
    targetDate = new Date(date.toMillis());
  } else if (isIsoDateTime(date)) {
    targetDate = new Date(date);
  } else if (isIsoDate(date)) {
    targetDate = new Date(date);
  } else {
    return false;
  }

  // Ensure valid date
  if (isNaN(targetDate.getTime())) {
    return false;
  }

  // Strip time parts
  const stripTime = (d: Date): Date => {
    const newDate = new Date(d);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  targetDate = stripTime(targetDate);
  const currentDate = stripTime(now);

  // Calculate the week start and end dates
  const getWeekBoundaries = (d: Date): { start: Date; end: Date } => {
    const start = new Date(d);
    const currentDay = d.getDay();

    // Calculate start of week
    const daysToSubtract = weekStart === "Mon"
      ? (currentDay === 0 ? 6 : currentDay - 1)
      : currentDay;

    start.setDate(d.getDate() - daysToSubtract);

    // Calculate end of week
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return { start, end };
  };

  const currentWeek = getWeekBoundaries(currentDate);

  // Check if target date falls within the current week's boundaries
  return targetDate.getTime() >= currentWeek.start.getTime() &&
         targetDate.getTime() <= currentWeek.end.getTime();
};
