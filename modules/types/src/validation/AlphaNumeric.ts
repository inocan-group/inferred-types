import type { AlphaChar, Err, ErrContext, IsAlphanumeric, IsNull, IsStringLiteral, NumericChar } from "inferred-types/types";

/**
 * Any alphabetic or numeric string character
 */
export type AlphaNumericChar = AlphaChar | NumericChar;



type _AlphaNumericPlus<
    T extends string,
    P extends string,
    TResult extends string,
    E
> = T extends ""
    ? TResult
    : T extends `${AlphaNumericChar}${infer REST}`
        ? _AlphaNumericPlus<REST, P, TResult, E>
        : T extends `${P}${infer REST}`
            ? _AlphaNumericPlus<REST, P, TResult, E>
            : E extends Error
                ? T extends `${infer Invalid}${string}`
                    ? ErrContext<E, {
                        actual: TResult;
                        expected: "Alphanumeric characters";
                        invalid: Invalid;
                    }>
                    : never
                : E;

export type AssertAlphanumeric<T extends string,E = never> = IsAlphanumeric<T> extends true
? T
:
