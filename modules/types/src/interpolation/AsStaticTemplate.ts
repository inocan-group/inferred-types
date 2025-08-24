import type {
    As,
    Err,
    IsUnion,
    ReplaceAll,
    ReplaceNumericInterpolation,
    ReplaceStringInterpolation,
    StringKeys,
    TemplateMap__Basic,
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

type Convert<
    TContent extends string,
    TSegments extends Record<string, unknown>,
    TKeys extends readonly string[] = StringKeys<TSegments>
> = TKeys extends [infer Head extends string, ...infer Rest extends readonly string[]]
    ? Convert<
        ReplaceAll<TContent, `\$\{${Head}\}`, `{{${Head}}}`>,
        TSegments,
        Rest
    >
    : TContent;

/**
 * **AsStaticTemplate**`<T, [M]>`
 *
 * Converts a string literal type into a Static Template where:
 *
 * - `${string}` is `{{string}}`
 * - `${number}` is `{{number}}`
 * - the `${boolean}` literal will produce a union and is too expensive to try and
 * capture so instead we'll throw an error.
 *
 * In addition you can optionally add a **template map** which will allow for additional
 * vocabulary to be used. There are a few pre-configured maps:
 *
 * - `TemplateMap__Basics` - this is the default of strings, numbers, and booleans
 * - `TemplateMap__Generics<T>` - an easy way to allow for generic params to included
 */
export type AsStaticTemplate<
    TContent extends string,
    TSegments extends Record<string, unknown> = TemplateMap__Basic
> = As<
    string extends TContent
        ? string
        : Convert<
            As<FromLiteralTemplate<TContent>, string>,
            TSegments
        >,
    string
>;
