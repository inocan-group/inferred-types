import { Iso8601Date, Iso8601DateTime, LuxonJs, MomentJs } from "src/types/index";
import { isMoment } from "./isMoment";
import { isLuxonDateTime } from "./isLuxonDateTime";

/**
* Type guard which validates that the passed in `val` is a date or date-time
* representation and that it's year is the same as the current year.
*/
export const isThisYear = (
  val: unknown
): val is Date | MomentJs | LuxonJs["DateTime"] | Iso8601DateTime | Iso8601Date => {
  // Get current year
  const currentYear = new Date().getFullYear();

  if (val instanceof Date) {
    return val.getFullYear() === currentYear;
  }

  if (isMoment(val)) {
    return val.year() === currentYear;
  }

  if (isLuxonDateTime(val)) {
    return val.year === currentYear;
  }

  // Handle ISO 8601 strings
  if (typeof val === "string") {
    // Match for full ISO 8601 date (YYYY-MM-DD) or datetime (YYYY-MM-DDThh:mm:ssZ) format
    const isoDateRegex = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])(?:T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][01]\d:[0-5]\d))?$/;

    if (!isoDateRegex.test(val)) {
      return false;
    }

    // Extract year from valid ISO string
    const yearMatch = val.match(/^(\d{4})/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1], 10);
      return year === currentYear;
    }
  }

  return false;
};
