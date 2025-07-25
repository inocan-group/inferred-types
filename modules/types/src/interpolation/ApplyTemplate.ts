import type {
    AfterFirst,
    AsBoolean,
    AsNumber,
    BooleanLike,
    First,
    FromLiteralTemplate,
    IsStringLiteral,
    NumberLike,
    RetainAfter,
    Second,
    StaticTemplateSections,
    StripAfter,
} from "inferred-types/types";

type ToBaseType<
    T extends readonly string[],
    R extends readonly (string | number | boolean)[] = []
> = [] extends T
    ? R
    : ToBaseType<
        AfterFirst<T>,
        [
            ...R,
            First<T> extends NumberLike
                ? AsNumber<First<T>>
                : First<T> extends BooleanLike
                    ? AsBoolean<First<T>>
                    : First<T>
        ]
    >;

type Finalize<
    TContent extends string,
    TApplied extends readonly string[],
    TOnlyStringLit extends boolean
> = TOnlyStringLit extends true
    ? [TContent, ...TApplied]
    : [TContent, ...ToBaseType<TApplied> ];

type Apply<
    TContent extends string,
    TStatic extends readonly string[],
    TResults extends readonly string[] = []
> = [] extends TStatic
    ? TResults
    : Apply<
        TContent,
        AfterFirst<TStatic>,
        [
            ...TResults,
            ...(
                TStatic extends readonly [string, string, ...string[]]
                    ? [StripAfter<
                        RetainAfter<TContent, First<TStatic>>,
                        Second<TStatic>
                    >]
                    : TStatic extends readonly [string, ...string[]]
                        ? [ RetainAfter<TContent, First<TStatic>> ]
                        : []
            )
        ]
    >;

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

    ? Finalize<
        TContent,
        Apply<
            TContent,
            StaticTemplateSections<FromLiteralTemplate<TTemplate>>
        >,
        TOnlyStringLit
    >
    : string;
