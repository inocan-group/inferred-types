import type {
    AsDateMeta,
    DateMeta,
    DateType,
    IsUnion,
    ParseDate,
    ParsedDate,
} from "inferred-types/types";
import { twoDigitHour } from "runtime/branding";
import { threeDigitMillisecond } from "runtime/branding/threeDigitMillisecond";
import { twoDigitMinute } from "runtime/branding/twoDigitMinute";
import { twoDigitSecond } from "runtime/branding/twoDigitSecond";
import { err } from "runtime/errors";
import { isEmpty, isString } from "runtime/type-guards";
import {
    isFourDigitYear,
    isThreeDigitMillisecond,
    isTimezoneOffset,
    isTwoDigitDate,
    isTwoDigitHour,
    isTwoDigitMinute,
    isTwoDigitMonth,
    isTwoDigitSecond
} from "runtime/type-guards/datetime";
import { isTypedError } from "runtime/type-guards/isTypedError";

/**
 * converts the parsed components of a `DateMeta` dictionary
 * to the representative ISO String.
 */
function convert<
    T extends DateMeta & { format: "auto" | DateType }
>(
    meta: T
) {
    let {
        format,
        dateType,
        hasTime,
        year,
        month,
        date,
        hour,
        minute,
        second,
        ms,
        timezone
    } = meta;

    if (format === "auto") {
        format = dateType;
    }

    switch (format) {
        case "date":
            return () => `${year}-${month}-${date}`;
        case "datetime": {
            let base: string;
            if (hasTime) {
                base = `${year}-${month}-${date}T${hour}:${minute}`;
                if (second) {
                    base = `${base}:${second}`;
                    if (ms) {
                        base = `${base}.${ms}`;
                    }
                }
                if (timezone) {
                    base = `${base}${timezone}`;
                }
                return () => base;
            }
            else {
                return () => `${year}-${month}-${date}`;
            }
        }
        case "year":
            return () => `${year}`;
        case "year-independent":
            return () => `--${month}-${date}`;
        case "year-month":
            return () => `-${year}-${month}`;
    }
}

function toString<
    T extends DateMeta
>(meta: T) {
    return convert({ format: "auto", ...meta });
}

function asYear<
    T extends DateMeta
>(meta: T) {
    return convert({ format: "year", ...meta });
}

function asYearIndependent<
    T extends DateMeta
>(meta: T) {
    return convert({ format: "year-independent", ...meta });
}

function asYearMonth<
    T extends DateMeta
>(meta: T) {
    return convert({ format: "year-month", ...meta });
}

function asDate<
    T extends DateMeta
>(meta: T) {
    return convert({ format: "date", ...meta });
}

function asDateTime<
    T extends DateMeta
>(meta: T) {
    return convert({ format: "datetime", ...meta });
}

type Returns<T extends string> = [IsUnion<T>] extends [true]
    ? DateMeta | Error
    : ParseDate<T> extends Error
        ? ParseDate<T> & Error
        : ParseDate<T> extends ParsedDate
            ? AsDateMeta<ParseDate<T>>
            : Error;

/**
 * Parses an ISO date or datetime string into its components.
 *
 * Returns an object: { year, month, date, time }
 * - year, month, date: numbers or null
 * - time: { hour, minute, second, ms, offset } or null
 * Throws if the string is not a valid ISO date/datetime.
 */
export function parseIsoDate<
    const T extends string
>(
    input: T
): Returns<T> {
    if (!isString(input)) {
        return err(
            "parse-date/wrong-type",
            `The type passed into parseIsoDate() was a '${typeof input}' but must be a string!`
        ) as unknown as Returns<T>;
    }

    // ISO datetime regex (YYYY-MM-DDTHH:mm:ss(.sss)?(Z|±hh:mm)?)
    const isoDateTime = /^(-?\d{4})-?(\d{2})-?(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(Z|[+-]\d{2}:?\d{2})?$/;
    // ISO date (YYYY-MM-DD or YYYYMMDD)
    const isoDate = /^(-?\d{4})-?(\d{2})-?(\d{2})$/;
    // Year only
    const isoYear = /^(-?\d{4})$/;
    // Year/month only: -YYYY-MM or -YYYYMM
    const isoYearMonth = /^-?(\d{4})-?(\d{2})$/;
    // Year-less: --MM-DD or --MMDD
    const isoMonthDay = /^--(\d{2})-?(\d{2})$/;

    if (isoDateTime.test(input)) {
        const match = input.match(isoDateTime);
        if (match) {
            const [_, yyyy, mm, dd, hh, min, sec, milli, tz] = match;

            const year = isFourDigitYear(yyyy)
                ? yyyy
                : isEmpty(yyyy)
                    ? null
                    : err("year");

            const month = isTwoDigitMonth(mm)
                ? mm
                : isEmpty(mm)
                    ? null
                    : err("month");

            const date = isTwoDigitDate(dd)
                ? dd
                : isEmpty(dd)
                    ? null
                    : err("date");

            const hour = isTwoDigitHour(hh)
                ? hh
                : isEmpty(hh)
                    ? null
                    : err("hour");

            const minute = isTwoDigitMinute(min)
                ? min
                : isEmpty(min)
                    ? null
                    : err("minute");

            const second = isTwoDigitSecond(sec)
                ? sec
                : isEmpty(sec)
                    ? null
                    : err("second");

            const ms = isThreeDigitMillisecond(milli)
                ? milli
                : isEmpty(milli)
                    ? null
                    : err("milli");

            const timezone = isTimezoneOffset(tz)
                ? tz
                : isEmpty(tz)
                    ? null
                    : err("timezone");

            const errors = [year, month, date, hour, minute, second, ms, timezone]
                .filter(i => isTypedError("" as string)(i))
                .map(i => i.type);
            if (errors.length > 0) {
                return err("parse-date", `The string passed in resembled a ISO DateTime but the following components failed: ${errors}`) as unknown as Returns<T>;
            }

            const val: DateMeta = {
                dateType: "datetime",
                hasTime: !(
                    isTimezoneOffset(timezone) && timezone === "Z"
                    && hour === twoDigitHour("00")
                    && minute === twoDigitMinute("00")
                    && (
                        second === twoDigitSecond("00") || second === null
                    ) && (
                        ms === threeDigitMillisecond("000") || ms === null
                    )),
                year,
                month,
                date,
                hour,
                minute,
                second,
                ms,
                timezone,
            } as DateMeta;

            return {
                ...val,
                // toString: toString(val),
                // asYear: asYear(val),
                // asYearIndependent: asYearIndependent(val),
                // asDate: asDate(val),
                // asDateTime: asDateTime(val),
                // asYearMonth: asYearMonth(val)
            } as Returns<T>;
        }
    }
    else if (isoYear.test(input)) {
        const match = input.match(isoYear);
        if (match) {
            const [_, year] = match;

            if (isFourDigitYear(year)) {
                const val = {
                    dateType: "year",
                    hasTime: false,
                    year,
                    month: null,
                    date: null,
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null
                } satisfies DateMeta;

                return {
                    ...val,
                    // toString: toString(val),
                    // asYear: asYear(val),
                    // asYearIndependent: asYearIndependent(val),
                    // asDate: asDate(val),
                    // asDateTime: asDateTime(val),
                    // asYearMonth: asYearMonth(val)
                } as Returns<T>;
            }
            else {
                return err(
                    `parse/iso-date`,
                    `A string which matched the regex for IsoYear was invalid upon inspection`
                ) as unknown as Returns<T>;
            }
        }
        else {
            return err(
                `parse/iso-date`,
                `A string which matched the regex for IsoYear was invalid upon inspection`
            ) as unknown as Returns<T>;
        }
    }
    else if (isoYearMonth.test(input)) {
        const match = input.match(isoYearMonth);
        if (match) {
            const [_, year, month] = match;

            if (isFourDigitYear(year) && isTwoDigitMonth(month)) {
                const val = {
                    dateType: "year-month",
                    hasTime: false,
                    year,
                    month,
                    date: null,
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null,

                } satisfies DateMeta;

                return {
                    ...val,
                } as Returns<T>;
            }
            else {
                return err(
                    `parse/iso-date`,
                    `A string which matched the regex for IsoYearMonth was invalid upon inspection`
                ) as unknown as Returns<T>;
            }
        }
        else {
            return err(
                `parse/iso-date`,
                `A string which matched the regex for IsoYearMonth was invalid upon inspection`
            ) as unknown as Returns<T>;
        }
    }
    else if (isoMonthDay.test(input)) {
        const match = input.match(isoMonthDay);
        if (match) {
            const [_, month, date] = match;

            if (isTwoDigitMonth(month) && isTwoDigitDate(date)) {
                const val = {
                    dateType: "year-independent",
                    hasTime: false,
                    year: null,
                    month,
                    date,
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null
                } satisfies DateMeta;

                return {
                    ...val,

                } as Returns<T>;
            }
            else {
                return err(
                    `parse/iso-date`,
                    `A string which matched the regex for IsoMonthDay (aka, year-independent) was invalid upon inspection`
                ) as unknown as Returns<T>;
            }
        }
        return err(
            `parse/iso-date`,
            `A string which matched the regex for IsoMonthDay (aka, year-independent) was invalid upon inspection`
        ) as unknown as Returns<T>;
    }
    else if (isoDate.test(input)) {
        const match = input.match(isoDate);
        if (match) {
            const [_, year, month, date] = match;

            if (isFourDigitYear(year) && isTwoDigitMonth(month) && isTwoDigitDate(date)) {
                const val = {
                    dateType: "year-independent",
                    hasTime: false,
                    year,
                    month,
                    date,
                    hour: null,
                    minute: null,
                    second: null,
                    ms: null,
                    timezone: null,
                } satisfies DateMeta;

                return {
                    ...val,
                    // toString: toString(val),
                    // asYear: asYear(val),
                    // asYearIndependent: asYearIndependent(val),
                    // asDate: asDate(val),
                    // asDateTime: asDateTime(val),
                    // asYearMonth: asYearMonth(val)
                } as Returns<T>;
            }
            return err(
                `parse/iso-date`,
                `A string which matched the regex for ISO Date was invalid upon inspection.`
            ) as unknown as Returns<T>;
        }
        return err(
            `parse/iso-date`,
            `A string which matched the regex for ISO Date was unable to then pull the expected match groups. This should not happen.`
        ) as unknown as Returns<T>;
    }

    return err(
        "parse/iso-date",
        "The string passed to parseIsoDate() was invalid!"
    ) as unknown as Returns<T>;
}
