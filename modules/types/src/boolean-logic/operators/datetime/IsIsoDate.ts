import type {
    IsEqual,
    IsoDateLike,
    IsStringLiteral,
    Length,
    NumericChar,
    NumericChar__ZeroToThree,
    NumericChar__ZeroToTwo,
    Slice,
} from "inferred-types/types";


/**
 * **IsIsoDate**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a valid ISO 8601 date string of the
 * format:
 *
 *  - `YYYY-MM-DD`,
 *  - `--MM-DD` - _for year-independent dates_
 */
export type IsIsoDate<T> = T extends IsoDateLike
    ? ParseDate<T>
    : false;

/**
 * Boolean operator which tests whether `T` is a ISO Year (
 * a four digit year)
 */
export type IsIsoYear<T> = IsStringLiteral<T> extends true
    ? T extends `${number}`
        ? Length<T> extends 4
            ? true
            : false
        : false
    : boolean;
