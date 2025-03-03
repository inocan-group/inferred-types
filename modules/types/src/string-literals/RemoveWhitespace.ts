import {
    IsStringLiteral,
    StripChars,
    Whitespace
} from "inferred-types/types";



/**
 * **RemovesWhitespace**`<T>`
 *
 * Removes _all_ whitespace in a string literal type. Unlike utilities like `Trim<T>`
 * which only focus on the the extremities of the string, this will remove ALL whitespace.
 *
 * ```ts
 * // "onetwothree"
 * type None = RemoveWhitespace<"one two\n   three">;
 * ```
 */
export type RemoveWhitespace<T extends string> = IsStringLiteral<T> extends true
? StripChars<T, Whitespace>
: string;


