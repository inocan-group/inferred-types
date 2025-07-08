import type { TypedFunction } from "types/base-types";

export interface LuxonStaticDateTime {

    /**
     * Create a DateTime instance from a string and a format.
     * @param inp - The date/time string to parse.
     * @param format - The format string to interpret `inp`.
     * @param opts - Options to customize parsing, like `locale` or `zone`.
     */
    fromFormat: (inp: string, format: string, opts?: object) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance from an SQL date/time string.
     * @param inp - The SQL string to parse.
     * @param opts - Options to customize parsing, like `zone`.
     */
    fromSQL: (inp: string, opts?: object) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance in the local time zone.
     * Accepts optional values for date and time components.
     */
    local: (year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance in the UTC time zone.
     * Accepts optional values for date and time components.
     */
    utc: (year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number) => LuxonLikeDateTime;

    /**
     * Get the current date and time as a DateTime instance.
     * @param zone - Optional time zone for the instance.
     */
    now: (zone?: string) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance from an object specifying date and time components.
     * @param config - Object with properties like `year`, `month`, `day`, etc.
     */
    fromObject: (config: { zone?: string; locale?: string; numberingSystem?: string; [key: string]: any }) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance from a JavaScript Date object.
     * @param date - The JavaScript Date object to convert.
     * @param opts - Options to customize conversion, like `zone`.
     */
    fromJSDate: (date: Date, opts?: { zone?: string; locale?: string }) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance from a number of milliseconds since the epoch.
     * @param milliseconds - Milliseconds since January 1, 1970.
     * @param opts - Options like `zone` or `locale`.
     */
    fromMillis: (milliseconds: number, opts?: { zone?: string; locale?: string }) => LuxonLikeDateTime;

    /**
     * Create a DateTime instance from a number of seconds since the epoch.
     * @param seconds - Seconds since January 1, 1970.
     * @param opts - Options like `zone` or `locale`.
     */
    fromSeconds: (seconds: number, opts?: { zone?: string; locale?: string }) => LuxonLikeDateTime;

}

export interface LuxonLikeDateTime {
    /**
     * Determine if the given input is a valid JavaScript Date object.
     * @param input - The value to check.
     * @returns True if `input` is a Date object, otherwise false.
     */
    isDate: (input: unknown) => input is Date;

    isOffsetFixed: boolean;

    /**
     * Create an invalid DateTime instance.
     * @param reason - A string describing why the instance is invalid.
     */
    invalid: (reason: string) => LuxonLikeDateTime;

    // Instance methods

    /**
     * Format the DateTime as a string using a specified format.
     * @param format - The format string.
     * @param opts - Options like `locale` for formatting.
     */
    toFormat: (format: string, opts?: { locale?: string }) => string;

    /**
     * Convert the DateTime to a SQL-compatible date/time string.
     * @param opts - Options to include the time zone or offset in the string.
     */
    toSQL: (opts?: { includeZone?: boolean; includeOffset?: boolean }) => string;

    /**
     * Convert the DateTime to an ISO 8601 string.
     * @param opts - Options to suppress milliseconds, seconds, or include the offset.
     */
    toISO: (opts?: { suppressMilliseconds?: boolean; suppressSeconds?: boolean; includeOffset?: boolean }) => string;

    /**
     * Convert the DateTime to an ISO 8601 date-only string.
     */
    toISODate: () => string;

    /**
     * Convert the DateTime to an ISO 8601 time-only string.
     * @param opts - Options to suppress milliseconds, seconds, or include the offset.
     */
    toISOTime: (opts?: { suppressMilliseconds?: boolean; suppressSeconds?: boolean; includeOffset?: boolean }) => string;

    /**
     * Convert the DateTime to a JavaScript Date object.
     */
    toJSDate: () => Date;

    /**
     * Convert the DateTime to a string representation.
     */
    toString: () => string;

    /**
     * Get the number of milliseconds since the epoch for this DateTime.
     */
    toMillis: () => number;

    /**
     * Get the number of seconds since the epoch for this DateTime.
     */
    toSeconds: () => number;

    /**
     * Add a duration to this DateTime.
     * @param duration - An object specifying the amount to add, e.g., `{ days: 1 }`.
     */
    plus: (duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }) => LuxonLikeDateTime;

    /**
     * Subtract a duration from this DateTime.
     * @param duration - An object specifying the amount to subtract, e.g., `{ days: 1 }`.
     */
    minus: (duration: { years?: number; months?: number; days?: number; hours?: number; minutes?: number; seconds?: number; milliseconds?: number }) => LuxonLikeDateTime;

    /**
     * Get the start of a specified time unit (e.g., start of the day).
     * @param unit - The unit, such as `"year"` or `"day"`.
     */
    startOf: (unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond") => LuxonLikeDateTime;

    /**
     * Get the end of a specified time unit (e.g., end of the day).
     * @param unit - The unit, such as `"year"` or `"day"`.
     */
    endOf: (unit: "year" | "month" | "week" | "day" | "hour" | "minute" | "second" | "millisecond") => LuxonLikeDateTime;

    /**
     * Set specific components of the DateTime (e.g., change the year or month).
     * @param values - An object with the components to set.
     */
    set: (values: { year?: number; month?: number; day?: number; hour?: number; minute?: number; second?: number; millisecond?: number; zone?: string; locale?: string }) => LuxonLikeDateTime;

    /**
     * Change the locale, numbering system, or calendar system of the DateTime.
     * @param values - An object specifying the new configuration.
     */
    reconfigure: (values: { locale?: string; numberingSystem?: string; outputCalendar?: string }) => LuxonLikeDateTime;

    /**
     * Change the time zone of the DateTime.
     * @param zone - The new time zone.
     * @param opts - Options to keep the local time or calendar time.
     */
    setZone: (zone: string, opts?: { keepLocalTime?: boolean; keepCalendarTime?: boolean }) => LuxonLikeDateTime;

    /**
     * Get the specified unit of the DateTime (e.g., the year or month).
     * @param unit - The unit to retrieve.
     */
    get: (unit: "year" | "month" | "day" | "hour" | "minute" | "second" | "millisecond") => number;

    /**
     * Calculate the difference between this DateTime and another.
     * @param other - The other DateTime to compare against.
     * @param unit - The units to calculate the difference in.
     * @param opts - Options like `conversionAccuracy`.
     */
    diff: TypedFunction;

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

}
