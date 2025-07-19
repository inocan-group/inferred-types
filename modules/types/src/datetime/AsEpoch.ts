import {
    FourDigitYear,
    TwoDigitDate,
    TwoDigitMonth
} from "types/datetime/general";
import { ParseDate, ParsedDate } from "types/datetime/ParseDate";
import { Err, TypedError } from "types/errors";
import { Multiply } from "types/numeric-literals";
import { AsNumber } from "types/type-conversion";
import { IsLeapYear } from "types/boolean-logic/operators/datetime";
import { Dictionary } from "types/base-types";
import { IsBranded, Unbrand } from "types/literals";

type SEC_IN_YEAR = 31536000;
type SEC_IN_DAY = 86400;

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
 * Returns the components needed to calculate epoch time.
 * Since Multiply cannot handle large numbers, we return the factors
 * that would need to be multiplied at runtime.
 */
type ToEpoch<
    Y extends number,
    M extends number,
    D extends number
> = {
    year: Y,
    yearMultiplier: SEC_IN_YEAR,
    daysBeforeMonth: Lookup<Y>[M],
    date: D,
    dayMultiplier: SEC_IN_DAY
};


/**
 * **AsEpoch**`<T>`
 *
 * Returns the components needed to calculate an Epoch timestamp (in seconds).
 * Due to TypeScript limitations with large number multiplication, this returns
 * an object with the factors that need to be multiplied at runtime:
 *
 * epoch = (year * yearMultiplier) + (daysBeforeMonth * dayMultiplier) + (date * dayMultiplier)
 *
 * - valid dates which do not define year, month and date return an Error
 * - if `T` is not a valid `ParsedDate` it will return an error;
 * and if `T` _was_ an error it will be proxied
 */
// Helper to extract number from branded type
type ExtractNumber<T> = T extends `${infer N extends number}` ? N : never;

export type AsEpoch<T> = T extends ParsedDate
? T extends [
    infer Year extends FourDigitYear<"branded">,
    infer Month extends TwoDigitMonth<"branded">,
    infer Date extends TwoDigitDate<"branded">,
    ...unknown[]
]
    ? ExtractNumber<Year> extends never
        ? Err<"invalid-date/year-extraction", "Could not extract year number", { year: Year }>
        : ExtractNumber<Month> extends never
            ? Err<"invalid-date/month-extraction", "Could not extract month number", { month: Month }>
            : ExtractNumber<Date> extends never
                ? Err<"invalid-date/date-extraction", "Could not extract date number", { date: Date }>
                : ToEpoch<ExtractNumber<Year>, ExtractNumber<Month>, ExtractNumber<Date>>
    : Err<
        "invalid-date/missing",
        `The AsEpoch type requires a ParsedDate with year, month, and date components, but one or more are missing.`,
        { parsed: T }
    >

: T extends TypedError
    ? T
    : Err<`invalid-type/not-parsed-date`>;


// Example usage:
type ParsedChristmas2024 = ParseDate<"2024-12-24">;
type ChristmasEpochComponents = AsEpoch<ParsedChristmas2024>;



type Year = FourDigitYear<"2024">;
type Raw = AsNumber<Year>; // "2024"


type Y = IsBranded<Year>;
type Y2 = IsBranded<"2025">;
