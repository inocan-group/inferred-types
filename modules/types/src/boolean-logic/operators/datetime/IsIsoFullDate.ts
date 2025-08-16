import type {
    AsNumber,
    FourDigitYear,
    IsAny,
    IsDoubleLeap,
    IsLeapYear,
    IsNever,
    IsoDate30,
    IsUnknown,
    ParseDate,
    TwoDigitDate,
    TwoDigitMonth,
    Unbrand
} from "inferred-types/types";

// Simplified validation that avoids complex default parameters
type IsValidDate<
    TYear extends FourDigitYear,
    TMonth extends TwoDigitMonth,
    TDate extends number
> = Unbrand<TMonth> extends "02"
    ? TDate extends 29
        ? IsLeapYear<Unbrand<TYear>> extends true
            ? true
            : false
        : TDate extends 30
            ? IsDoubleLeap<Unbrand<TYear>> extends true
                ? true
                : false
            : TDate extends 28 | 27 | 26 | 25 | 24 | 23 | 22 | 21 | 20 | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1
                ? true
                : false
    : Unbrand<TMonth> extends IsoDate30
        ? TDate extends 30 | 29 | 28 | 27 | 26 | 25 | 24 | 23 | 22 | 21 | 20 | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1
            ? true
            : false
        : TDate extends 31 | 30 | 29 | 28 | 27 | 26 | 25 | 24 | 23 | 22 | 21 | 20 | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1
            ? true
            : false;

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
                        ? IsValidDate<Year, Month, AsNumber<Unbrand<Date>>>
                        : false
                : false;
