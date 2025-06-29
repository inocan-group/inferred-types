import type { If, IfEqual, IsNumericLiteral, IsStringLiteral, Length, Tuple } from "inferred-types/types";

/**
 * **IfLength**`<TEvaluate,TLength,IF,[ELSE],[MAYBE]>`
 *
 * Type utility which returns type `IF` when `TEvaluate` evaluates to being
 * a length of `TLength`. It returns type `ELSE` if it can determine the length
 * at design time and otherwise returns `MAYBE`.
 *
 * - the `ELSE` type will default to `TEvaluate` by default
 * - the `MAYBE` type will default to `IF | ELSE` by default
 * - If a _non-array_ type is passed into `TEvaluate` then utility will result `ELSE`
 * type.
 */
export type IfLength<
    TEvaluate extends Tuple | string,
    TLength extends number,
    IF,
    ELSE = TEvaluate,
    MAYBE = IF | ELSE,
> = TEvaluate extends readonly unknown[]
    ? IsNumericLiteral<TLength> extends true
        ? IfEqual<Length<TEvaluate>, TLength, IF, ELSE>
        : MAYBE
    : TEvaluate extends unknown[]
        ? MAYBE
        : TEvaluate extends string
            ? If<
                IsStringLiteral<TEvaluate>,
                IfEqual<Length<TEvaluate>, TLength, IF, ELSE>,
                MAYBE
            >
            : MAYBE;
