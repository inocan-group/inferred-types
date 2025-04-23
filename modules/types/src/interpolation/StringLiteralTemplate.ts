import type { AfterFirst, First, IsStringLiteral } from "inferred-types/types";

type _StringLiteralTemplate<T extends string | number | boolean> = T extends number
    ? `${number}`
    : T extends boolean
        ? `${boolean}`
        : T extends `${infer Before}{{string}}${infer After}`
            ? StringLiteralTemplate<`${Before}${string}${After}`>
            : T extends `${infer Before}{{number}}${infer After}`
                ? StringLiteralTemplate<`${Before}${number}${After}`>
                : T extends `${infer Before}{{boolean}}${infer After}`
                    ? StringLiteralTemplate<`${Before}${boolean}${After}`>
                    : T extends `${infer Before}{{true}}${infer After}`
                        ? StringLiteralTemplate<`${Before}${true}${After}`>
                        : T extends `${infer Before}{{false}}${infer After}`
                            ? StringLiteralTemplate<`${Before}${false}${After}`>
                            : T;

/**
 * **StringLiteralTemplate**`<T>`
 *
 * Converts a string literal into a "template" by replacing tokens
 * like `{{string}}`, `{{number}}`, or `{{boolean}}` with the
 * cooresponding string literal equivalent.
 *
 * **Related:** `EachAsStringLiteralTemplate`, `ObjectValuesAsStringLiteralTemplate`
 */
export type StringLiteralTemplate<
    T extends string | number | boolean
> = IsStringLiteral<T> extends true
    ? _StringLiteralTemplate<T>
    : never;

/**
 * **EachAsStringLiteralTemplate**`<T>`
 *
 * Convert a tuple of values which are easily made into string literal types
 * into a tuple of literal template strings.
 *
 * **Related:** `StringLiteralTemplate`
 */
export type EachAsStringLiteralTemplate<
    T extends readonly (string | number | boolean)[] | readonly string[],
    R extends readonly string[] = []
> = [] extends T
    ? R
    : EachAsStringLiteralTemplate<
        AfterFirst<T>,
        [...R, StringLiteralTemplate<First<T>>]
    >;

/**
 * **ObjectValuesAsStringLiteralTemplate**`<T>`
 *
 * Convert the values of an object into String Literal Templates.
 *
 * **Related:** `StringLiteralTemplate`, `EachAsStringLiteralTemplate`
 */
export type ObjectValuesAsStringLiteralTemplate<
    T extends Record<string, string>
> = {
    [K in keyof T]: T[K] extends string
        ? StringLiteralTemplate<T[K]>
        : never
};
