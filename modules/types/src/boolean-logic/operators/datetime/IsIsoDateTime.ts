import {
    IsIsoMonthDateTime,
    IsIsoYearMonthTime,
    IsoDateTimeLike,
    IsIsoFullDateTime
} from "inferred-types/types";

/**
 * **IsIsoDateTime**`<T>`
 *
 * Boolean operator which test whether `T` is a valid ISO 8601
 * DateTime string.
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO DateTime string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDateTime` but if your runtime uses the
 * `isIsoDateTime()` type guard it will pass and be upgraded.
 */
export type IsIsoDateTime<T> = T extends IsoDateTimeLike
? IsIsoFullDateTime<T> extends true
    ? true
    : IsIsoMonthDateTime<T> extends true
    ? true
    : IsIsoYearMonthTime<T> extends true
    ? true
    : false
: false;


