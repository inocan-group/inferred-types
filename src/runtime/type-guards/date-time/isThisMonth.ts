import { Iso8601Date, Iso8601DateTime, LuxonJs, MomentJs } from "src/types/index";
import { isMoment } from "./isMoment";
import { isLuxonDateTime } from "./isLuxonDateTime";

/**
* Type guard which validates that the passed in `val` is a date or date-time
* representation and that it's month is the same as the current month year.
*/
export const isThisMonth = (
  val: unknown
): val is Date | MomentJs | LuxonJs["DateTime"] | Iso8601DateTime | Iso8601Date  => {
const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11, we need 1-12

  // Handle Date object
  if (val instanceof Date) {
    return val.getFullYear() === currentYear &&
           (val.getMonth() + 1) === currentMonth;
  }

  if (isMoment(val)) {
    const monthValue = val.month();
    return val.year() === currentYear &&
           (typeof monthValue === "number" ? monthValue + 1 : monthValue) === currentMonth; // Moment months are 0-11
  }

  if (isLuxonDateTime(val)) {
    return val.year === currentYear &&
           val.month === currentMonth; // Luxon months are 1-12
  }

  if (typeof val === "string") {
    const dateMatch = val.match(/^(\d{4})-(\d{2})/);
    if (dateMatch) {
      const year = parseInt(dateMatch[1], 10);
      const month = parseInt(dateMatch[2], 10);
      return year === currentYear && month === currentMonth;
    }
  }

  return false;
}
