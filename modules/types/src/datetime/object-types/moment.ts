import { IsoDateTime, TypedFunction } from "inferred-types/types";

export interface MomentLike {
    _isAMomentObject: boolean;
    isValid(): boolean;
    toDate(): Date;
    format(formatStr?: string): string;
    utc(): MomentLike;
    local(): MomentLike;
    add(amount: number, unit: string): MomentLike;
    subtract(amount: number, unit: string): MomentLike;
    /**
     * Formats a moment object into a calendar time string.
     * @param key - A string key specifying the calendar format.
     * @param m - A MomentJS object representing a comparison time.
     * @param now - A MomentJS object representing the reference time (default is now).
     */
    longDateFormat: (key: any) => string;

    /**
     * Returns the string to use for invalid dates.
     */
    invalidDate: () => string;

    /**
     * Formats an ordinal number (e.g., 1st, 2nd, 3rd).
     * @param n - The number to format.
     */
    ordinal: (n: number) => string;

    /**
     * Prepares an input string for parsing (custom pre-parsing logic).
     * @param inp - The input string to preprocess.
     */
    preparse: (inp: string) => string;

    /**
     * Formats an output string (custom post-formatting logic).
     * @param inp - The input string to postprocess.
     */
    postformat: (inp: string) => string;

    /**
     * Formats relative time strings (e.g., "in 5 minutes", "5 minutes ago").
     * @param n - The number to format (e.g., 5 for "5 minutes").
     * @param withoutSuffix - Whether to exclude the suffix (e.g., "ago" or "in").
     * @param key - The time unit (e.g., "s" for seconds, "m" for minutes).
     * @param isFuture - Whether the time is in the future.
     */
    relativeTime: (n: number, withoutSuffix: boolean, key: any, isFuture: boolean) => string;

    /**
     * Formats relative time for past or future comparisons.
     * @param diff - The time difference in milliseconds.
     * @param absRelTime - The absolute relative time string.
     */
    pastFuture: (diff: number, absRelTime: string) => string;

    /**
     * Sets specific configuration values for the moment object.
     * @param config - An object containing configuration keys and values.
     */
    toISOString: () => IsoDateTime;

    /**
     * Converts the MomentJS object to a JavaScript Date object.
     */
    toDate: () => Date;
    tz?: () => string;
    /**
     * Converts the MomentJS object to a Unix timestamp in seconds.
     */
    unix: () => number;

    /**
     * Converts the MomentJS object to a JSON string.
     */
    toJSON: () => string;

    /**
     * Formats the MomentJS object as a string using a specific format.
     * @param format - A string specifying the format to use.
     */
    format: (format?: string) => string;

    // Parsing and validation methods

    /**
     * Clones the current MomentJS object.
     */
    clone: () => MomentLike;

    /**
     * Checks if the MomentJS object is the same as another moment.
     * @param other - The moment to compare with.
     * @param granularity - The level of precision to compare at (e.g., "day", "hour").
     */
    isSame: (other: MomentLike, granularity?: string) => boolean;

    /**
     * Checks if the MomentJS object is before another moment.
     * @param other - The moment to compare with.
     * @param granularity - The level of precision to compare at (e.g., "day", "hour").
     */
    isBefore: (other: MomentLike, granularity?: string) => boolean;

    /**
     * Checks if the MomentJS object is after another moment.
     * @param other - The moment to compare with.
     * @param granularity - The level of precision to compare at (e.g., "day", "hour").
     */
    isAfter: (other: MomentLike, granularity?: string) => boolean;


    /**
     * Checks if the MomentJS object is valid.
     */
    isValid: () => boolean;



    /**
     * Checks if the MomentJS object is between two other moments.
     * @param from - The starting moment.
     * @param to - The ending moment.
     * @param granularity - The level of precision to compare at (e.g., "day", "hour").
     * @param inclusively - Controls whether the bounds are inclusive (`"[]"`) or exclusive (`"()"`).
     */
    isBetween: (from: MomentLike, to: MomentLike, granularity?: string, inclusively?: string) => boolean;

    calendar: TypedFunction;

    [key: string]: any;
}


