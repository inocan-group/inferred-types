import type {
    ReplaceNumericInterpolation,
    ReplaceStringInterpolation
} from "inferred-types/types";

/**
 * **FromLiteralTemplate**`<T>`
 *
 * Converts a string literal type into a String Template where:
 *
 * - `${string}` is `{{string}}`
 * - `${number}` is `{{number}}`
 * - `${boolean}` is `{{boolean}}`
 *
 * This type utility is the _inverse_ of `StringLiteralTemplate`.
 */
export type FromLiteralTemplate<T extends string> = ReplaceStringInterpolation<
    ReplaceNumericInterpolation<T, "{{number}}">,
    "{{string}}"
>;
