import { DateLike } from "inferred-types/types";

/**
 * Parses an ISO date or datetime string into its components.
 *
 * Returns an object: { year, month, date, time }
 * - year, month, date: numbers or null
 * - time: { hour, minute, second, ms, offset } or null
 * Throws if the string is not a valid ISO date/datetime.
 */
export function parseIsoDate<T extends DateLike>(input: T) {
    if (typeof input !== "string") {
        throw new Error("Input must be a string");
    }

    // ISO datetime regex (YYYY-MM-DDTHH:mm:ss(.sss)?(Z|±hh:mm)?)
    const isoDateTime = /^(-?\d{4})-?(\d{2})-?(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:?\d{2})?$/;
    // ISO date (YYYY-MM-DD or YYYYMMDD)
    const isoDate = /^(-?\d{4})-?(\d{2})-?(\d{2})$/;
    // Year only
    const isoYear = /^(-?\d{4})$/;
    // Year/month only: -YYYY-MM or -YYYYMM
    const isoYearMonth = /^-?(\d{4})-?(\d{2})$/;
    // Year-less: --MM-DD or --MMDD
    const isoMonthDay = /^--(\d{2})-?(\d{2})$/;

    let match;

    if ((match = input.match(isoDateTime))) {
        const [, year, month, date, hour, minute, second = "0", ms = "0", offset = "Z"] = match;
        return {
            year: Number(year),
            month: Number(month),
            date: Number(date),
            time: {
                hour: Number(hour),
                minute: Number(minute),
                second: Number(second),
                ms: Number(ms),
                offset: offset || "Z"
            }
        };
    }
    if ((match = input.match(isoDate))) {
        const [, year, month, date] = match;
        return {
            year: Number(year),
            month: Number(month),
            date: Number(date),
            time: null
        };
    }
    if ((match = input.match(isoYear))) {
        const [, year] = match;
        return {
            year: Number(year),
            month: null,
            date: null,
            time: null
        };
    }
    if ((match = input.match(isoYearMonth))) {
        const [, year, month] = match;
        return {
            year: Number(year),
            month: Number(month),
            date: null,
            time: null
        };
    }
    if ((match = input.match(isoMonthDay))) {
        const [, month, date] = match;
        return {
            year: null,
            month: Number(month),
            date: Number(date),
            time: null
        };
    }

    throw new Error(`Input is not a valid ISO date or datetime: ${input}`);
}
