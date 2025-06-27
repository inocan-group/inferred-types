import type { AfterFirst, First, IsNumericLiteral, IsStringLiteral } from "inferred-types/types";

type LitString<
    TItems extends readonly unknown[],
    TLiteral extends string = "",
> = [] extends TItems
    ? TLiteral
    : LitString<
        AfterFirst<TItems>,
        First<TItems> extends string
            ? IsStringLiteral<First<TItems>> extends true
                ? `${TLiteral}${First<TItems>}`
                : `${TLiteral}${string}`
            : First<TItems> extends number
                ? IsNumericLiteral<First<TItems>> extends true
                    ? `${TLiteral}${First<TItems>}`
                    : `${TLiteral}${number}`
                : TLiteral
    >;

/**
 * **StringLiteralFromTuple**`<T>`
 *
 * Receives a tuple and creates a string literal type based
 * on the sequence of elements in the tuple.
 *
 * ```ts
 * // `${string}(${number})${string}`
 * type Lit=StringLiteralFromTuple<[
 *  string, "(", number, ")", string
 * ]>;
 * ```
 */
export type StringLiteralFromTuple<
    T extends readonly unknown[],
> = LitString<T>;
