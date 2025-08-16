import type {
    FourDigitYear,
    IsoFullDateTimeLike,
    ParseDate,
    ParsedDate,
    ParsedTime,
    TwoDigitDate,
    TwoDigitMonth
} from "inferred-types/types";

/**
 * **IsIsoFullDateTime**`<T>`
 *
 * Tests whether `T` is an ISO 8601 DateTime (not just Date) which is
 * of the format:
 *
 * - `YYYY-MM-DDT${time}`, _or_
 * - `YYYYMMDDT${time}`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO DateTime string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDateTime` but if your runtime uses the
 * `isIsoDateTime()` it will pass.
 */
export type IsIsoFullDateTime<T> = T extends IsoFullDateTimeLike
    ? ParseDate<T> extends ParsedDate
        ? ParseDate<T> extends [
            FourDigitYear<"strong">,
            TwoDigitMonth,
            TwoDigitDate,
            ParsedTime
        ]
            ? true
            : false
        : false
    : false;
