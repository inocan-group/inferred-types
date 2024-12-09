import { Iso8601DateTime } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * Type guard which validates that `val` is a valid ISO8601 DateTime string.
 *
 * Valid forms include:
 * - `2024-01-01T00:00:00Z`                  (UTC/Zulu time)
 * - `2024-01-01T00:00:00+00:00`             (Explicit timezone offset)
 * - `2024-01-01T00:00:00-00:00`             (Explicit timezone offset)
 * - `2024-01-01T00:00:00.000Z`              (With milliseconds, UTC)
 * - `2024-01-01T00:00:00.000+00:00`         (With milliseconds, offset)
 * - `2024-01-01T00:00`                      (Minutes precision)
 * - `2024-01-01T00:00:00`                   (Seconds precision)
 */
 export const isIsoDateTime = (val: unknown): val is Iso8601DateTime => {
   if (!isString(val)) {
     return false;
   }

   // Regex with time validation and proper timezone format
   const ISO_DATETIME_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2})?$/;

   if (!ISO_DATETIME_REGEX.test(val)) {
     return false;
   }

   // Extract time components for validation
   const [_, ...matches] = val.match(ISO_DATETIME_REGEX) || [];
   const [year, month, day, hours, minutes, seconds] = matches.map(Number);

   // Validate hours (0-23), minutes (0-59), seconds (0-59)
   if (hours >= 24 || minutes >= 60 || (seconds != null && seconds >= 60)) {
     return false;
   }

   // Validate month (1-12)
   if (month < 1 || month > 12) {
     return false
   };

   // Validate day based on month and year
   const daysInMonth = new Date(year, month, 0).getDate();
   if (day < 1 || day > daysInMonth) {
     return false
   };

   // Validate timezone offset if present
   const tzMatch = val.match(/([+-])(\d{2}):(\d{2})$/);
   if (tzMatch) {
     const [_, _sign, tzHours, tzMinutes] = tzMatch;
     const numHours = parseInt(tzHours, 10);
     const numMinutes = parseInt(tzMinutes, 10);

     // Validate timezone offset ranges
     if (numHours > 14 || numMinutes > 59) {
       return false;
     }
     if (numHours === 14 && numMinutes > 0) {
       return false;
     }
   }

   return true;
 };
