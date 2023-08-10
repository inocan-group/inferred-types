import { NumericChar } from "./character-sets";

export type ZeroToFive = "0" | "1" | "2" | "3" | "4" | "5";
export type AmPm = "am" | "pm" | "AM" | "PM";

/**
 * **TimeInMinutes_Simple**
 * 
 * A simple representation of time at a HH:MM resolution.
 */
export type TimeInMinutes_Simple = `${number}:${number}${AmPm | ""}`;

/**
 * **TimeInSeconds_Simple**
 * 
 * A simple representation of time at a HH:MM:SS resolution.
 */
export type TimeInSeconds_Simple = `${number}:${number}:${number}${AmPm | ""}`;

/**
 * **Time_Simple**
 * 
 * A simple representation of time in either minute or seconds based resolution
 * (e.g., `12:15`, `12:15pm`, `12:15:00`, `12:15:00pm`)
 */
export type Time_Simple = TimeInMinutes_Simple | TimeInSeconds_Simple;

/**
 * **HoursMinutes**
 * 
 * Time expressed as just hours and minutes. Military time is allowed.
 */
export type HoursMinutes = `${"1" | "2" | ""}${NumericChar}:${ZeroToFive}${NumericChar}`;

export type OptionalSpace = "" | " ";

/**
 * **HoursMinutes12**
 * 
 * Time expressed as just hours and minutes. Military time is not allowed but am/pm is
 * optionally allowed at end.
 */
export type HoursMinutes12 = `${"10" | "11" | "12" | `1${NumericChar}`}:${ZeroToFive}${NumericChar}${AmPm}`;

/**
 * **HoursMinutesSeconds**
 * 
 * Time expressed in hours, minutes, and seconds. Military time is allowed but not 
 * an am/pm indicator.
 */
export type HoursMinutesSeconds = `${HoursMinutes}${"" | `:${ZeroToFive}${number}`}`;

export type HoursMinutesSeconds12 = `${"10" | "11" | "12" | `1${NumericChar}`}:${ZeroToFive}${NumericChar}:${ZeroToFive}${number}${AmPm}`;

export type MilitaryTime = HoursMinutes | HoursMinutesSeconds;
export type CivilianTime = HoursMinutes12 | HoursMinutesSeconds12;

/**
 * **TimeInMinutes**
 * 
 * Time expressed in either military or civilian fashion where
 * time resolution is measured in minutes (e.g., `12:43pm` or `23:15`)
 */
export type TimeInMinutes = HoursMinutes | HoursMinutes12;

/**
 * **TimeInSeconds**
 * 
 * Time expressed in either military or civilian fashion where
 * time resolution is measured in minutes (e.g., `12:43:01pm` or `23:15:34`)
 */
export type TimeInSeconds = HoursMinutesSeconds | HoursMinutesSeconds12;

/**
 * **Time**
 * 
 * A simplified type for Time which accepts military as well as civilian time
 * and resolutions of `HH:MM` and `HH:MM:SS`.
 */
export type Time = `${number}:${number}${AmPm | ""}` | `${number}:${number}:${number}${AmPm | ""}`;
