import { ParseDate, ParsedTime, TwoDigitMinute, TwoDigitMonth } from "inferred-types/types";

/**
 * **IsIsoMonthDateTime**
 *
 * A boolean operator which tests whether `T` is ISO DateTime
 * which specifies month and date but not year.
 *
 * **Related:** `IsIsoMonthDate`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO DateTime string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDateTime` but if your runtime uses the
 * `isIsoDateTime()` type guard it will pass and be upgraded.
 */
export type IsIsoMonthDateTime<T> = T extends `--${string}T${string}`
    ? ParseDate<T> extends [
        null,
        TwoDigitMonth,
        TwoDigitMinute,
        ParsedTime
    ]
        ? true
        : false
    : false;

