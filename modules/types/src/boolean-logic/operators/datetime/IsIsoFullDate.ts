import type {
    As,
    DaysInMonth,
    FourDigitYear,
    IsAny,
    IsNever,
    IsUnknown,
    ParseDate,
    TwoDigitDate,
    TwoDigitMonth,
    IsGreaterThan,
    AsNumber
} from "inferred-types/types";

/**
 * **IsIsoFullDate**`<T>`
 *
 * Tests whether `T` is an ISO 8601 Date (not DateTime) which is
 * of the format:
 *
 * - `YYYY-MM-DD`, _or_
 * - `YYYYMMDD`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO Date string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDate` but if your runtime uses the
 * `isIsoDate()` type guard it will pass and be upgraded.
 */
export type IsIsoFullDate<T> = [IsAny<T>] extends [true]
    ? boolean
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean

: T extends string
    ? string extends T
        ? boolean
    : ParseDate<T> extends [
        infer Year extends FourDigitYear,
        infer Month extends TwoDigitMonth,
        infer Date extends TwoDigitDate,
        null
    ]
        ? DaysInMonth<Month,Year> extends number
            ? IsGreaterThan<
                AsNumber<Date>,
                DaysInMonth<Month,Year>
            > extends true
                ? false
                : true
            : false
        : false
: false;
