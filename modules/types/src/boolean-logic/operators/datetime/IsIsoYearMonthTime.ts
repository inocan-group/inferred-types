import type {
    FourDigitYear,
    NumericChar,
    ParseDate,
    ParsedTime,
    TwoDigitMonth
} from "inferred-types/types";

/**
 * **IsIsoYearMonthTime**
 *
 * A boolean operator which tests whether `T` is **ISO DateTime**
 * which specifies year and month but not date.
 *
 * **Related:** `IsIsoYearMonth`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO DateTime string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDateTime` but if your runtime uses the
 * `isIsoDateTime()` type guard it will pass and be upgraded.
 */
export type IsIsoYearMonthTime<T> = T extends `-${NumericChar}${string}T${string}`
    ? ParseDate<T> extends [
        FourDigitYear,
        TwoDigitMonth,
        null,
        ParsedTime
    ]
        ? true
        : false
    : false;
