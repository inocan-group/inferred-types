import { IsStringLiteral } from "src/boolean-logic"

/**
 * **StringLiteralTemplate**`<T>`
 *
 * Converts a string literal into a "template" by replacing tokens
 * like `{{string}}`, `{{number}}`, or `{{boolean}}` with the
 * cooresponding string literal equivalent.
 */
export type StringLiteralTemplate<T extends string | number | boolean> = IsStringLiteral<T> extends true
    ? T extends number
        ? `${number}`
        : T extends boolean
        ? `${boolean}`
        : T extends `${infer Before}{{string}}${infer After}`
        ? StringLiteralTemplate<`${Before}${string}${After}`>
        : T extends `${infer Before}{{number}}${infer After}`
        ? StringLiteralTemplate<`${Before}${number}${After}`>
        : T extends `${infer Before}{{boolean}}${infer After}`
        ? StringLiteralTemplate<`${Before}${boolean}${After}`>
        : T
    : never;
