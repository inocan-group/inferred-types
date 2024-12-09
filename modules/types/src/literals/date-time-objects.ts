import { Iso8601DateTime } from "inferred-types/types";

type RelativeTimeKey = "s" | "ss" | "m" | "mm" | "h" | "hh" | "d" | "dd" | "w" | "ww" | "M" | "MM" | "y" | "yy";
type CalendarKey = "sameDay" | "nextDay" | "lastDay" | "nextWeek" | "lastWeek" | "sameElse" | string;
type LongDateFormatKey = "LTS" | "LT" | "L" | "LL" | "LLL" | "LLLL" | "lts" | "lt" | "l" | "ll" | "lll" | "llll";

export type UnitType =
  | "year" | "years" | "y"
  | "month" | "months" | "M"
  | "week" | "weeks" | "w"
  | "day" | "days" | "d"
  | "hour" | "hours" | "h"
  | "minute" | "minutes" | "m"
  | "second" | "seconds" | "s"
  | "millisecond" | "milliseconds" | "ms";

/**
 * **MomentJS**
 *
 * A type representing the [MomentJS](https://momentjs.com/docs/#/displaying/) library
 */
 export type MomentJs = {
   // Calendar-related methods

    /**
    * Formats a moment object into a calendar time string.
    * @param key - A string key specifying the calendar format.
    * @param m - A MomentJS object representing a comparison time.
    * @param now - A MomentJS object representing the reference time (default is now).
    */
    calendar(key?: CalendarKey, m?: MomentJs, now?: MomentJs): string;

    /**
    * Gets or sets long date format strings for a specific key.
    * @param key - The key for the desired format (e.g., "LT", "LTS").
    */
    longDateFormat(key: LongDateFormatKey): string;

    /**
    * Returns the string to use for invalid dates.
    */
    invalidDate(): string;

    /**
    * Formats an ordinal number (e.g., 1st, 2nd, 3rd).
    * @param n - The number to format.
    */
    ordinal(n: number): string;

    /**
    * Prepares an input string for parsing (custom pre-parsing logic).
    * @param inp - The input string to preprocess.
    */
    preparse(inp: string): string;

    /**
    * Formats an output string (custom post-formatting logic).
    * @param inp - The input string to postprocess.
    */
    postformat(inp: string): string;

    /**
    * Formats relative time strings (e.g., "in 5 minutes", "5 minutes ago").
    * @param n - The number to format (e.g., 5 for "5 minutes").
    * @param withoutSuffix - Whether to exclude the suffix (e.g., "ago" or "in").
    * @param key - The time unit (e.g., "s" for seconds, "m" for minutes).
    * @param isFuture - Whether the time is in the future.
    */
    relativeTime(n: number, withoutSuffix: boolean, key: RelativeTimeKey, isFuture: boolean): string;

    /**
    * Formats relative time for past or future comparisons.
    * @param diff - The time difference in milliseconds.
    * @param absRelTime - The absolute relative time string.
    */
    pastFuture(diff: number, absRelTime: string): string;

    /**
    * Sets specific configuration values for the moment object.
    * @param config - An object containing configuration keys and values.
    */
    set(config: object): void;

    // Date and time formatting methods

    /**
    * Converts the MomentJS object to an ISO 8601 string.
    */
    toISOString(): Iso8601DateTime;

    /**
    * Converts the MomentJS object to a JavaScript Date object.
    */
    toDate(): Date;

    /**
    * Converts the MomentJS object to a Unix timestamp in milliseconds.
    */
    valueOf(): number;

    /**
    * Converts the MomentJS object to a Unix timestamp in seconds.
    */
    unix(): number;

    /**
    * Converts the MomentJS object to a JSON string.
    */
    toJSON(): string;

    /**
    * Formats the MomentJS object as a string using a specific format.
    * @param format - A string specifying the format to use.
    */
    format(format?: string): string;

    // Parsing and validation methods

    /**
    * Clones the current MomentJS object.
    */
    clone(): MomentJs;

    /**
    * Checks if the MomentJS object is valid.
    */
    isValid(): boolean;

    /**
    * Checks if the MomentJS object is the same as another moment.
    * @param other - The moment to compare with.
    * @param granularity - The level of precision to compare at (e.g., "day", "hour").
    */
    isSame(other: MomentJs, granularity?: string): boolean;

    /**
    * Checks if the MomentJS object is before another moment.
    * @param other - The moment to compare with.
    * @param granularity - The level of precision to compare at (e.g., "day", "hour").
    */
    isBefore(other: MomentJs, granularity?: string): boolean;

    /**
    * Checks if the MomentJS object is after another moment.
    * @param other - The moment to compare with.
    * @param granularity - The level of precision to compare at (e.g., "day", "hour").
    */
    isAfter(other: MomentJs, granularity?: string): boolean;

    /**
    * Checks if the MomentJS object is between two other moments.
    * @param from - The starting moment.
    * @param to - The ending moment.
    * @param granularity - The level of precision to compare at (e.g., "day", "hour").
    * @param inclusivity - Controls whether the bounds are inclusive (`"[]"`) or exclusive (`"()"`).
    */
    isBetween(from: MomentJs, to: MomentJs, granularity?: string, inclusivity?: string): boolean;

    // Manipulation methods

    /**
    * Adds a duration to the MomentJS object.
    * @param amount - The amount to add.
    * @param unit - The unit to add (e.g., "days", "hours").
    */
    add(amount: number, unit: UnitType): MomentJs;

    /**
    * Subtracts a duration from the MomentJS object.
    * @param amount - The amount to subtract.
    * @param unit - The unit to subtract (e.g., "days", "hours").
    */
    subtract(amount: number, unit: UnitType): MomentJs;

    /**
    * Sets specific components of the MomentJS object.
    * @param unit - The unit to set (e.g., "year", "month").
    * @param value - The value to set the unit to.
    */
    set(unit: string, value: number): MomentJs;

    /**
    * Starts a range of time for the MomentJS object.
    * @param unit - The unit to start at (e.g., "day", "month").
    */
    startOf(unit: string): MomentJs;

    /**
    * Ends a range of time for the MomentJS object.
    * @param unit - The unit to end at (e.g., "day", "month").
    */
    endOf(unit: string): MomentJs;

    /**
    * Gets the difference between this MomentJS object and another.
    * @param other - The moment to compare with.
    * @param unit - The unit to measure the difference in (e.g., "days", "hours").
    * @param precise - Whether to return a precise value (default is false).
    */
    diff(other: MomentJs, unit?: string, precise?: boolean): number;

    /**
    * Gets or sets the time zone offset for the MomentJS object.
    * @param input - If provided, sets the offset to this value (in minutes).
    */
    utcOffset(input?: number): number;

    // Locale and culture methods

    /**
    * Changes the locale for the current MomentJS object.
    * @param locale - The locale to set.
    * @returns The current locale if no arguments are provided.
    */
    locale(locale?: string): string;

    /**
    * Gets or sets the first day of the week.
    * @param input - The day to set as the first day of the week (0 = Sunday, 1 = Monday).
    */
    weekday(input?: number): number;

    // Month-related methods


    /**
    * Gets an array of all month names.
    */
    months(): string[];

    /**
    * Gets the month name for a specific moment object.
    * @param m - The moment object to retrieve the month for.
    * @param format - The format string to use (optional).
    */
    months(m: MomentJs, format?: string): string;

    /**
    * Gets an array of all short month names.
    */
    monthsShort(): string[];

    /**
    * Gets the short month name for a specific moment object.
    * @param m - The moment object to retrieve the short month for.
    * @param format - The format string to use (optional).
    */
    monthsShort(m: MomentJs, format?: string): string;

    /**
    * Parses a month name and returns the corresponding month index.
    * @param monthName - The name of the month to parse.
    * @param format - The format string to use.
    * @param strict - Whether to enforce strict parsing.
    */
    monthsParse(monthName: string, format: string, strict: boolean): number;

    /**
    * Returns a regex pattern for matching month names.
    * @param strict - Whether to enforce strict parsing.
    */
    monthsRegex(strict: boolean): RegExp;

    /**
    * Returns a regex pattern for matching short month names.
    * @param strict - Whether to enforce strict parsing.
    */
    monthsShortRegex(strict: boolean): RegExp;

    // Week-related methods

    /**
    * Gets the ISO week number for a specific moment object.
    * @param m - The moment object to retrieve the week number for.
    */
    week(m: MomentJs): number;

    /**
    * Gets the day of the year that the week starts on.
    */
    firstDayOfYear(): number;

    /**
    * Gets the first day of the week (e.g., Sunday or Monday).
    */
    firstDayOfWeek(): number;

    // Weekday-related methods

    /**
    * Gets an array of all weekday names.
    */
    weekdays(): string[];
    /**
    * Gets the weekday name for a specific moment object.
    * @param m - The moment object to retrieve the weekday for.
    * @param format - The format string to use (optional).
    */
    weekdays(m: MomentJs, format?: string): string;

    /**
    * Gets an array of all short weekday names.
    */
    weekdaysShort(): string[];

    /**
    * Gets the short weekday name for a specific moment object.
    * @param m - The moment object to retrieve the short weekday for.
    */
    weekdaysShort(m: MomentJs): string;

    /**
    * Gets an array of all minimum weekday names (e.g., "Mo", "Tu").
    */
    weekdaysMin(): string[];

    /**
    * Gets the minimum weekday name for a specific moment object.
    * @param m - The moment object to retrieve the minimum weekday for.
    */
    weekdaysMin(m: MomentJs): string;

    /**
    * Parses a weekday name and returns the corresponding day index.
    * @param weekdayName - The name of the weekday to parse.
    * @param format - The format string to use.
    * @param strict - Whether to enforce strict parsing.
    */
    weekdaysParse(weekdayName: string, format: string, strict: boolean): number;

    /**
    * Returns a regex pattern for matching weekday names.
    * @param strict - Whether to enforce strict parsing.
    */
    weekdaysRegex(strict: boolean): RegExp;

    /**
    * Returns a regex pattern for matching short weekday names.
    * @param strict - Whether to enforce strict parsing.
    */
    weekdaysShortRegex(strict: boolean): RegExp;

    /**
    * Returns a regex pattern for matching minimum weekday names.
    * @param strict - Whether to enforce strict parsing.
    */
    weekdaysMinRegex(strict: boolean): RegExp;

    // AM/PM and meridiem methods

    /**
    * Checks if the given input string represents a PM time.
    * @param input - The string to check.
    */
    isPM(input: string): boolean;

    /**
    * Formats a time in 12-hour AM/PM format.
    * @param hour - The hour value (0-23).
    * @param minute - The minute value (0-59).
    * @param isLower - Whether to return lowercase (e.g., "am" or "pm").
    */
    meridiem(hour: number, minute: number, isLower: boolean): string;


    /**
    * Gets or sets the year.
    * @param value - If provided, sets the year to this value.
    * @returns The year if no argument is provided, or a MomentJs instance if setting.
    */
    year(value?: number): number | MomentJs;

    /**
    * Gets or sets the month (0-11).
    * @param value - If provided, sets the month to this value.
    * @returns The month if no argument is provided, or a MomentJs instance if setting.
    */
    month(value?: number): number | MomentJs;

    /**
    * Gets or sets the day of the month.
    * @param value - If provided, sets the day to this value.
    * @returns The day if no argument is provided, or a MomentJs instance if setting.
    */
    date(value?: number): number | MomentJs;

    /**
    * Gets or sets the hour.
    * @param value - If provided, sets the hour to this value.
    * @returns The hour if no argument is provided, or a MomentJs instance if setting.
    */
    hour(value?: number): number | MomentJs;

    /**
    * Gets or sets the minute.
    * @param value - If provided, sets the minute to this value.
    * @returns The minute if no argument is provided, or a MomentJs instance if setting.
    */
    minute(value?: number): number | MomentJs;

    /**
    * Gets or sets the second.
    * @param value - If provided, sets the second to this value.
    * @returns The second if no argument is provided, or a MomentJs instance if setting.
    */
    second(value?: number): number | MomentJs;

    /**
    * Gets or sets the millisecond.
    * @param value - If provided, sets the millisecond to this value.
    * @returns The millisecond if no argument is provided, or a MomentJs instance if setting.
    */
    millisecond(value?: number): number | MomentJs;

    /**
    * Gets the day of the year (1-366).
    * @returns The day of the year.
    */
    dayOfYear(): number;

    fromNow(withoutSuffix?: boolean): string;
  from(moment: MomentJs, withoutSuffix?: boolean): string;
  toNow(withoutSuffix?: boolean): string;
  to(moment: MomentJs, withoutSuffix?: boolean): string;

  // Additional properties
  _isAMomentObject?: boolean;
  _i?: any;
  _f?: string;
  _l?: string;
  _strict?: boolean;
  _isUTC?: boolean;
  _pf?: object;
  _locale?: object;
  _d?: Date;
  _isValid?: boolean;
  _z?: { name: string }; // Zone info
  _offset?: number;
  _local: boolean;
  _tzm?: number;

  calendar(): string;
  calendar(referenceDay: MomentJs): string;
  calendar(referenceDay: MomentJs, formats: object): string;

  fromNow(withoutSuffix?: boolean): string;
  from(moment: MomentJs | string | number | Date | string[], withoutSuffix?: boolean): string;
  toNow(withoutSuffix?: boolean): string;
  to(moment: MomentJs | string | number | Date | string[], withoutSuffix?: boolean): string;
  [key: string]: any;
};

/**
 * A representation of the [Luxon](https://moment.github.io/luxon/#/?id=luxon) library's type system
 */
export type LuxonJs = {
  calendars: {
    standard: {
      months: string[];
      weekdays: string[];
    };
    gregory: {
      months: string[];
      weekdays: string[];
    };
  };

  Duration:  {
    // Static factory methods

    /**
     * Create a Duration from an object specifying units and their values.
     * @param values - An object with time unit keys like `hours` and `minutes`.
     */
    fromObject(values: { [unit: string]: number }): LuxonJs["Duration"];

    /**
     * Create a Duration from a number of milliseconds.
     * @param milliseconds - The number of milliseconds.
     */
    fromMillis(milliseconds: number): LuxonJs["Duration"];

    /**
     * Create a Duration from an ISO 8601 duration string.
     * @param isoString - The ISO duration string to parse.
     */
    fromISO(isoString: string): LuxonJs["Duration"];

    /**
     * Create a Duration from a number of seconds.
     * @param seconds - The number of seconds.
     */
    fromSeconds(seconds: number): LuxonJs["Duration"];

    // Instance properties

    /** The amount of years in this Duration. */
    years: number;

    /** The amount of months in this Duration. */
    months: number;

    /** The amount of weeks in this Duration. */
    weeks: number;

    /** The amount of days in this Duration. */
    days: number;

    /** The amount of hours in this Duration. */
    hours: number;

    /** The amount of minutes in this Duration. */
    minutes: number;

    /** The amount of seconds in this Duration. */
    seconds: number;

    /** The amount of milliseconds in this Duration. */
    milliseconds: number;

    /** Indicates whether this Duration is valid. */
    isValid: boolean;

    /** The reason why this Duration is invalid, if applicable. */
    invalidReason: string | null;

    /** Additional details about why this Duration is invalid. */
    invalidExplanation: string | null;

    // Instance methods

    /**
     * Get the value of a specific unit in this Duration.
     * @param unit - The unit to retrieve (e.g., `"hours"` or `"days"`).
     */
    get(unit: "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds" | "milliseconds"): number;

    /**
     * Convert this Duration to an ISO 8601 string.
     */
    toISO(): string;

    /**
     * Convert this Duration to a JavaScript object with time unit keys.
     */
    toObject(): { [unit: string]: number };

    /**
     * Convert this Duration to a number of milliseconds.
     */
    toMillis(): number;

    /**
     * Normalize this Duration, shifting larger units down to smaller units.
     */
    normalize(): LuxonJs["Duration"];

    /**
     * Add another Duration to this Duration.
     * @param other - The Duration to add.
     */
    plus(other: LuxonJs["Duration"] | { [unit: string]: number }): LuxonJs["Duration"];

    /**
     * Subtract another Duration from this Duration.
     * @param other - The Duration to subtract.
     */
    minus(other: LuxonJs["Duration"] | { [unit: string]: number }): LuxonJs["Duration"];

    /**
     * Scale this Duration by a factor.
     * @param factor - The factor to scale by.
     */
    mapUnits(factor: number): LuxonJs["Duration"];

    /**
     * Reconfigure this Duration's locale and numbering system.
     * @param opts - Configuration options like `locale` or `numberingSystem`.
     */
    reconfigure(opts: { locale?: string; numberingSystem?: string }): LuxonJs["Duration"];
  }

  DateTime: {
    // Static factory methods

    /**
     * Create a DateTime instance from a string and a format.
     * @param inp - The date/time string to parse.
     * @param format - The format string to interpret `inp`.
     * @param opts - Options to customize parsing, like `locale` or `zone`.
     */
    fromFormat(inp: string, format: string, opts?: object): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance from an SQL date/time string.
     * @param inp - The SQL string to parse.
     * @param opts - Options to customize parsing, like `zone`.
     */
    fromSQL(inp: string, opts?: object): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance in the local time zone.
     * Accepts optional values for date and time components.
     */
    local(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance in the UTC time zone.
     * Accepts optional values for date and time components.
     */
    utc(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): LuxonJs["DateTime"];

    /**
     * Get the current date and time as a DateTime instance.
     * @param zone - Optional time zone for the instance.
     */
    now(zone?: string): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance from an object specifying date and time components.
     * @param config - Object with properties like `year`, `month`, `day`, etc.
     */
    fromObject(config: { zone?: string; locale?: string; numberingSystem?: string; [key: string]: any }): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance from a JavaScript Date object.
     * @param date - The JavaScript Date object to convert.
     * @param opts - Options to customize conversion, like `zone`.
     */
    fromJSDate(date: Date, opts?: { zone?: string; locale?: string }): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance from a number of milliseconds since the epoch.
     * @param milliseconds - Milliseconds since January 1, 1970.
     * @param opts - Options like `zone` or `locale`.
     */
    fromMillis(milliseconds: number, opts?: { zone?: string; locale?: string }): LuxonJs["DateTime"];

    /**
     * Create a DateTime instance from a number of seconds since the epoch.
     * @param seconds - Seconds since January 1, 1970.
     * @param opts - Options like `zone` or `locale`.
     */
    fromSeconds(seconds: number, opts?: { zone?: string; locale?: string }): LuxonJs["DateTime"];

    /**
     * Determine if the given input is a valid JavaScript Date object.
     * @param input - The value to check.
     * @returns True if `input` is a Date object, otherwise false.
     */
    isDate(input: unknown): input is Date;

    /**
     * Create an invalid DateTime instance.
     * @param reason - A string describing why the instance is invalid.
     */
    invalid(reason: string): LuxonJs["DateTime"];

    // Instance methods

    /**
     * Format the DateTime as a string using a specified format.
     * @param format - The format string.
     * @param opts - Options like `locale` for formatting.
     */
    toFormat(format: string, opts?: { locale?: string }): string;

    /**
     * Convert the DateTime to a SQL-compatible date/time string.
     * @param opts - Options to include the time zone or offset in the string.
     */
    toSQL(opts?: { includeZone?: boolean; includeOffset?: boolean }): string;

    /**
     * Convert the DateTime to an ISO 8601 string.
     * @param opts - Options to suppress milliseconds, seconds, or include the offset.
     */
    toISO(opts?: { suppressMilliseconds?: boolean; suppressSeconds?: boolean; includeOffset?: boolean }): string;

    /**
     * Convert the DateTime to an ISO 8601 date-only string.
     */
    toISODate(): string;

    /**
     * Convert the DateTime to an ISO 8601 time-only string.
     * @param opts - Options to suppress milliseconds, seconds, or include the offset.
     */
    toISOTime(opts?: { suppressMilliseconds?: boolean; suppressSeconds?: boolean; includeOffset?: boolean }): string;

    /**
     * Convert the DateTime to a JavaScript Date object.
     */
    toJSDate(): Date;

    /**
     * Convert the DateTime to a string representation.
     */
    toString(): string;

    /**
     * Get the number of milliseconds since the epoch for this DateTime.
     */
    toMillis(): number;

    /**
     * Get the number of seconds since the epoch for this DateTime.
     */
    toSeconds(): number;

    /**
     * Add a duration to this DateTime.
     * @param duration - An object specifying the amount to add, e.g., `{ days: 1 }`.
     */
    plus(duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }): LuxonJs["DateTime"];

    /**
     * Subtract a duration from this DateTime.
     * @param duration - An object specifying the amount to subtract, e.g., `{ days: 1 }`.
     */
    minus(duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }): LuxonJs["DateTime"];

    /**
     * Get the start of a specified time unit (e.g., start of the day).
     * @param unit - The unit, such as `"year"` or `"day"`.
     */
    startOf(unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond"): LuxonJs["DateTime"];

    /**
     * Get the end of a specified time unit (e.g., end of the day).
     * @param unit - The unit, such as `"year"` or `"day"`.
     */
    endOf(unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond"): LuxonJs["DateTime"];

    /**
     * Set specific components of the DateTime (e.g., change the year or month).
     * @param values - An object with the components to set.
     */
    set(values: { year?: number; month?: number; day?: number; hour?: number; minute?: number; second?: number; millisecond?: number; zone?: string; locale?: string }): LuxonJs["DateTime"];

    /**
     * Change the locale, numbering system, or calendar system of the DateTime.
     * @param values - An object specifying the new configuration.
     */
    reconfigure(values: { locale?: string; numberingSystem?: string; outputCalendar?: string }): LuxonJs["DateTime"];

    /**
     * Change the time zone of the DateTime.
     * @param zone - The new time zone.
     * @param opts - Options to keep the local time or calendar time.
     */
    setZone(zone: string, opts?: { keepLocalTime?: boolean; keepCalendarTime?: boolean }): LuxonJs["DateTime"];

    /**
     * Get the specified unit of the DateTime (e.g., the year or month).
     * @param unit - The unit to retrieve.
     */
    get(unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond"): number;

    /**
     * Calculate the difference between this DateTime and another.
     * @param other - The other DateTime to compare against.
     * @param unit - The units to calculate the difference in.
     * @param opts - Options like `conversionAccuracy`.
     */
    diff(other: LuxonJs["DateTime"], unit?: string | string[], opts?: { conversionAccuracy?: "casual" | "longterm" }): LuxonJs["Duration"];

    // Properties
    /** The year represented by this DateTime instance */
    year: number;

    /** The month (1-12) represented by this DateTime instance */
    month: number;

    /** The day of the month (1-31) represented by this DateTime instance */
    day: number;

    /** The hour (0-23) represented by this DateTime instance */
    hour: number;

    /** The minute (0-59) represented by this DateTime instance */
    minute: number;

    /** The second (0-59) represented by this DateTime instance */
    second: number;

    /** The millisecond (0-999) represented by this DateTime instance */
    millisecond: number;

    /** The ISO week year represented by this DateTime instance */
    weekYear: number;

    /** The ISO week number (1-53) represented by this DateTime instance */
    weekNumber: number;

    /** The ISO weekday (1-7, where 1 is Monday) represented by this DateTime instance */
    weekday: number;

    /** The ordinal day of the year (1-365 or 1-366 for leap years) */
    ordinal: number;

    /** Indicates whether the DateTime instance is valid */
    isValid: boolean;

    /** The reason the DateTime instance is invalid, if applicable */
    invalidReason: string | null;

    /** Additional details about why the DateTime instance is invalid */
    invalidExplanation: string | null;

    /** The name of the time zone for this DateTime instance */
    zoneName: string;

    /** The locale used by this DateTime instance */
    locale: string;
  };
};
