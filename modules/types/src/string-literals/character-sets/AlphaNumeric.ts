import type { AlphaChar, IsStringLiteral, NumericChar } from "inferred-types/types";

/**
 * Any alphabetic or numeric string character
 */
export type AlphaNumericChar = AlphaChar | NumericChar;

type AlphaNumericAcc<
    T extends string,
    TResult extends string,
> = T extends ""
    ? TResult
    : // iterate through characters and look for exception
    T extends `${AlphaNumericChar}${infer REST}`
        ? AlphaNumericAcc<REST, TResult>
        : never;

/**
 * **AlphaNumeric**`<T>`
 *
 * Type utility which tests that all characters in `T` are alpha-numeric and returns
 * `T` "as is" in cases where this conditions is met. In cases where the condition is
 * not met, the type is converted to `never`.
 *
 * **Related:** `AlphaNumericChar`
 */
export type AlphaNumeric<T extends string> = IsStringLiteral<T> extends true
    ? AlphaNumericAcc<T, T>
/** Invalid Alphanumeric string */
    : never;
