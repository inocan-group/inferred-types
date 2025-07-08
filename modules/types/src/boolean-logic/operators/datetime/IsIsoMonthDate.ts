import type {
    FourDigitYear,
    IsoYearMonth,
    IsWideString,
    ParseDate,
    ParsedDate,
    TwoDigitDate
} from "inferred-types/types";

/**
 * Tests whether `T` is a valid **ISO Date** which captures month
 * and date but not year:
 *
 * - `-YYYY-MM` _or_ `-YYYYMM`
 *
 * **Related:**
 * - `IsIsoMonthDateTime`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO Date string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDate` but if your runtime uses the
 * `isIsoDate()` it will pass.
 */
export type IsIsoMonthDate<T> = T extends IsoYearMonth
    ? IsWideString<T> extends true
        ? boolean
        : ParseDate<T> extends ParsedDate
            ? ParseDate<T> extends [FourDigitYear, TwoDigitDate, null, null]
                ? true
                : false
            : false
    : false;
