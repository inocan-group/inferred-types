import { FourDigitYear, IsoFullDateLike, ParseDate, ParsedDate, TwoDigitDate, TwoDigitMonth } from "inferred-types/types";

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
export type IsIsoFullDate<T> = T extends IsoFullDateLike
    ? ParseDate<T> extends ParsedDate
    ? ParseDate<T> extends [
        FourDigitYear<"strong">,
        TwoDigitMonth,
        TwoDigitDate,
        null
    ]
    ? true
    : false
    : false
    : false;

