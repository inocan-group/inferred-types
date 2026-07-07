import type {
    AsBoolean,
    AsNumber,
    BooleanLike,
    FromLiteralTemplate,
    IsStringLiteral,
    NumberLike,
    RetainAfter,
    StaticTemplateSections,
    StripAfter,
} from "inferred-types/types";

type ToBaseType<
    T extends readonly string[]
> = {
    [K in keyof T]: T[K] extends NumberLike
        ? AsNumber<T[K]>
        : T[K] extends BooleanLike
            ? AsBoolean<T[K]>
            : T[K]
};

type Finalize<
    TContent extends string,
    TApplied extends readonly string[],
    TOnlyStringLit extends boolean
> = TOnlyStringLit extends true
    ? [TContent, ...TApplied]
    : [TContent, ...ToBaseType<TApplied>];

type Apply<
    TContent extends string,
    TStatic extends readonly string[],
    TResults extends readonly string[] = []
> = [] extends TStatic
    ? TResults
    : TStatic extends readonly [infer Head extends string, infer Next extends string, ...infer Rest extends string[]]
        ? Apply<
            TContent,
            [Next, ...Rest],
            [
                ...TResults,
                StripAfter<RetainAfter<TContent, Head>, Next>
            ]
        >
        : TStatic extends readonly [infer Head extends string]
            ? [...TResults, RetainAfter<TContent, Head>]
            : TResults;

/**
 * **ApplyTemplate**`<TContent,TTemplate,[TOnlyStringLit]>`
 *
 * If the content found in `TContent` is a match for `TTemplate`, then
 * the type returned will be the dynamic segments defined in the template.
 *
 * Alternatively, if `TContent` _does not_ match the dynamic segments
 * defined in `TTemplate` then a **invalid-content** error will be returned.
 *
 * Returns a tuple of the format:
 *
 * - [ full, p1, p2, p3, ... ]
 */
export type ApplyTemplate<
    TContent extends string,
    TTemplate extends string,
    TOnlyStringLit extends boolean = true
> = IsStringLiteral<TContent> extends true

    ? FromLiteralTemplate<TTemplate> extends infer Template extends string
        ? Finalize<
            TContent,
            Apply<
                TContent,
                StaticTemplateSections<Template>
            >,
            TOnlyStringLit
        >
        : never
    : string;
