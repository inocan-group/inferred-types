import { Err, TypedError } from "types/errors";
import {
    AddPositive,
    NumberLike,
} from "types/numeric-literals";
import { AsNumber } from "types/type-conversion";
import { IsLeapYear } from "types/boolean-logic/operators/datetime";
import { DateMeta, AsDateMeta, ParsedDate, ParseDate } from "types/datetime";
import { Concat } from "types/string-literals";


/**
 * Lookup the number of days in the year prior to a given month
 *
 * @param Y - The year (needed to determine if it's a leap year)
 */
type Lookup<Y extends number> = IsLeapYear<`${Y}`> extends true
    ? {
        1: 0,      // January
        2: 31,     // February (31 days from January)
        3: 60,     // March (31 + 29 days from Jan + Feb in leap year)
        4: 91,     // April (60 + 31 days)
        5: 121,    // May (91 + 30 days)
        6: 152,    // June (121 + 31 days)
        7: 182,    // July (152 + 30 days)
        8: 213,    // August (182 + 31 days)
        9: 244,    // September (213 + 31 days)
        10: 274,   // October (244 + 30 days)
        11: 305,   // November (274 + 31 days)
        12: 335,   // December (305 + 30 days)
    } & Record<number, number>
    : {
        1: 0,      // January
        2: 31,     // February (31 days from January)
        3: 59,     // March (31 + 28 days from Jan + Feb in regular year)
        4: 90,     // April (59 + 31 days)
        5: 120,    // May (90 + 30 days)
        6: 151,    // June (120 + 31 days)
        7: 181,    // July (151 + 30 days)
        8: 212,    // August (181 + 31 days)
        9: 243,    // September (212 + 31 days)
        10: 273,   // October (243 + 30 days)
        11: 304,   // November (273 + 31 days)
        12: 334,   // December (304 + 30 days)
    } & Record<number, number>;


/**
 * Returns the components needed to calculate a relative time.
 *
 * - the year is multiplied by 1000 (using decimal shift for efficiency)
 * - the month is passed into a lookup to arrive at the number
 * of _days_ of the given year which have passed at the start
 * of that month
 * - the date is just an integer value of the number _days_ which
 * have expired on the current month
 *
 * ### Formula
 *
 * ```ts
 * Relative = (Year * 1000) + Lookup<Month> + Date
 * ```
 */
type Days<
    Y extends number,
    M extends number,
    D extends number
> = AddPositive<
    Lookup<Y>[M],
    D
> extends number
? Concat<[
    Y,
    AddPositive<Lookup<Y>[M],D>
]> extends NumberLike
    ? Concat<[
        Y,
        AddPositive<Lookup<Y>[M],D>
    ]>
    : never
: never;


/**
 * **AsRelativeDate**`<T>`
 *
 * Reduces a Date to a number which can be used
 * as an informal means of comparing dates relatively
 */
export type AsRelativeDate<
    T,
    P extends ParsedDate | Error = T extends ParsedDate
        ? T
        : ParseDate<T> extends ParsedDate
            ? ParseDate<T>
            : Err<"invalid-date">
> = P extends ParsedDate
? AsDateMeta<P> extends DateMeta
    ? Days<
        AsNumber<AsDateMeta<P>["year"]>,
        AsNumber<AsDateMeta<P>["month"]>,
        AsNumber<AsDateMeta<P>["date"]>
    >
    : never

: P extends TypedError
    ? P
    : Err<
        "invalid-date/missing",
        `The AsRelativeDate type requires a ParsedDate with year, month, and date components, but one or more are missing.`,
        { parsed: T }
    >;

