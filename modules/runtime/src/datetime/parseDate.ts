import type {  } from "inferred-types/types";
import type {
    IsJsDate,
    IsLuxonDateTime,
    IsMoment,
    AsDateMeta,
    DateLike,
    DateMeta,
    Err,
    IsAny,
    IsDayJs,
    IsInteger,
    Or,
    ParseDate,
    ParsedDate
} from "inferred-types/types";
import {
    asDateTime,
    parseIsoDate
} from "runtime/datetime";

import { err } from "runtime/errors";
import {
    isString
} from "runtime/type-guards";

type Returns<T extends DateLike> = [IsAny<T>] extends [true]
    ? Date | Error
    : T extends string
        ? ParseDate<T> extends Error
            ? ParseDate<T>
            : ParseDate<T> extends ParsedDate
                ? AsDateMeta<ParseDate<T>>
                : Err<`parse-date/string`, `unable to parse the string '${T}' as a a date!`>
        : T extends object
            ? Or<[
                IsMoment<T>,
                IsLuxonDateTime<T>,
                IsDayJs<T>,
                IsJsDate<T>,
            ]> extends true
                ? DateMeta
                : Err<
                    "parse-date/object",
                    `An object was passed into parseDate() but it was not recognized as a known Date type!`,
                    { date: T }
                >
            : T extends number
                ? IsInteger<T> extends true
                    ? DateMeta
                    : Err<
                        `parse-date/number`,
                        `When a number is passed into parseDate() it is assumed to be an epoch timestamp but the number passed in was a floating point number which indicates it is NOT an epoch timestamp!`,
                        { date: T }
                    >
                : Err<
                    `parse-date/invalid-type`,
                    `The type passed into parseDate() can not be parsed into a date!`,
                    { parse: T }
                >;

export function parseDate<
    T extends DateLike
>(d: T): Returns<T> {
    let iso: string;

    if (isString(d)) {
        return parseIsoDate(d) as unknown as Returns<T>;
    }
    else {
        try {
            iso = asDateTime(d).toISOString();
        }
        catch (error) {
            return error instanceof Error
                ? error as Returns<T>
                : err(`parse/invalid`, `Unable to parse date-like value`) as unknown as Returns<T>;
        }
        return parseIsoDate(iso) as Returns<T>;
    }
}
