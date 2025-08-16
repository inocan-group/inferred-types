import type {
    Err,
    IsUnion,
    ReplaceNumericInterpolation,
    ReplaceStringInterpolation,
} from "inferred-types/types";

type NoBooleanConversion<T> = Err<
    `invalid-string/boolean-literal`,
        `An attempt was made to convert a string from a "literal template" to a "static template" but the use of ${boolean} converts to a union type and quickly becomes unmanageable. Use the static {{boolean}} form instead.`,
        { template: T }
>;

/**
 * **FromLiteralTemplate**`<T>`
 *
 * Converts a string literal type into a Static Template where:
 *
 * - `${string}` is `{{string}}`
 * - `${number}` is `{{number}}`
 * - the `${boolean}` literal will produce a union and is too expensive to try and
 * capture so instead we'll return an error.
 *
 * This type utility is the _inverse_ of `StringLiteralTemplate`.
 */
export type FromLiteralTemplate<T extends string> = string extends T
    ? string | Error

    : IsUnion<T> extends true
        ? NoBooleanConversion<T>
        : ReplaceStringInterpolation<
            ReplaceNumericInterpolation<T, "{{number}}">,
            "{{string}}"
        >;

/**
 * **AsStaticTemplate**`<T>`
 *
 * Converts a string literal type into a Static Template where:
 *
 * - `${string}` is `{{string}}`
 * - `${number}` is `{{number}}`
 * - the `${boolean}` literal will produce a union and is too expensive to try and
 * capture so instead we'll throw an error.
 */
export type AsStaticTemplate<T extends string> = FromLiteralTemplate<T>;
