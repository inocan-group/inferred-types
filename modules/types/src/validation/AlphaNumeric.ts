import type { AlphaChar, Err, ErrContext, IsStringLiteral, NumericChar } from "inferred-types/types";

/**
 * Any alphabetic or numeric string character
 */
export type AlphaNumericChar = AlphaChar | NumericChar;

type AlphaNumericAcc<
    T extends string,
    TResult extends string,
    E
> = T extends ""
    ? TResult
    : // iterate through characters and look for exception
    T extends `${AlphaNumericChar}${infer REST}`
        ? AlphaNumericAcc<REST, TResult, E>
        : E extends Error
            ? T extends `${infer Invalid}${string}`
                ? ErrContext<E, {
                    actual: TResult,
                    expected: "Alphanumeric characters", invalid: Invalid
                }>
                : never
            : E;

/**
 * **AlphaNumeric**`<T>`
 *
 * Type utility which tests that all characters in `T` are alpha-numeric and returns
 * `T` "as is" in cases where this conditions is met. In cases where the condition is
 * not met, the type is converted to `never`.
 *
 * **Related:** `AlphaNumericChar`
 */
export type AlphaNumeric<
    T extends string,
    E = never
> = IsStringLiteral<T> extends true
    ? AlphaNumericAcc<T, T, E>
    : Err<
        `invalid-type`,
        `The AlphaNumeric<T> type utility requires that any T passed in be a string literal and not a the wide "string" type!`
    >;

type _AlphaNumericPlus<
    T extends string,
    P extends string,
    TResult extends string,
    E
> = T extends ""
    ? TResult
    : // iterate through characters and look for exception
    T extends `${AlphaNumericChar}${infer REST}`
        ? _AlphaNumericPlus<REST, P, TResult, E>
        : T extends `${P}${infer REST}`
            ? _AlphaNumericPlus<REST, P, TResult, E>
            : E extends Error
            ? T extends `${infer Invalid}${string}`
                ? ErrContext<E, {
                    actual: TResult,
                    expected: "Alphanumeric characters", invalid: Invalid
                }>
                : never
            : E;

export type AlphaNumericPlus<
    T extends string,
    P extends string,
    E = never
> = IsStringLiteral<T> extends true
    ? _AlphaNumericPlus<T, P, T, E>
    : Err<
        `invalid-type`,
        `The AlphaNumericPlus<T> type utility requires that any T passed in be a string literal and not a the wide "string" type!`
    >;
