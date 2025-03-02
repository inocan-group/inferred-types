import {
    AfterFirst,
    Chars,
    First,
    IsStringLiteral,
    Whitespace
} from "inferred-types/types";


type Remove<
    T extends readonly string[],
    S extends string = ""
> = [] extends T
? S
: First<T> extends Whitespace
    ? Remove<AfterFirst<T>, S>
    : Remove<AfterFirst<T>, `${S}${First<T>}`>;


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
? Remove<Chars<T>>
: string;


