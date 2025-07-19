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
import { GetBrand, IsBranded, Unbrand } from "types/literals";
import { AsDateMeta } from "types/datetime/AsDateMeta";
import { DateMeta } from "types/datetime/DateMeta";

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
    Y extends unknown,
    M extends unknown,
    D extends unknown
> = {
    year: Y,
    month: M,
    date: D
};



export type AsEpoch<T> = T extends ParsedDate
? AsDateMeta<T> extends DateMeta
        ? ToEpoch<
            AsDateMeta<T>["year"],
            AsDateMeta<T>["month"],
            AsDateMeta<T>["date"]
        >
        : never

: T extends TypedError
    ? T
    : Err<
        "invalid-date/missing",
        `The AsEpoch type requires a ParsedDate with year, month, and date components, but one or more are missing.`,
        { parsed: T }
    >;


// Example usage:
type ParsedChristmas2024 = ParseDate<"2024-12-24">;
type ChristmasEpochComponents = AsEpoch<ParsedChristmas2024>;



