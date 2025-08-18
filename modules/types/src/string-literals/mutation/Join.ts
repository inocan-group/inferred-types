import type {
    AfterFirst,
    First,
    IsGreaterThan,
    IsWideArray,
    TakeFirst,
    ToStringArray,
} from "inferred-types/types";

type Process<
    TTuple extends readonly string[],
    TSeparator extends string,
    TResult extends string = "",
> = [] extends TTuple
    ? TResult
    : Process<
        AfterFirst<TTuple>,
        TSeparator,
        TResult extends ""
            ? First<TTuple> extends ""
                ? TResult
                : `${First<TTuple>}`
            : First<TTuple> extends ""
                ? TResult
                : `${TResult}${TSeparator}${First<TTuple>}`
    >;

type Slicer<
    TTuple extends readonly string[],
    TMax extends number,
    TEllipsis extends string | false,
> = TEllipsis extends string
    ? [...TakeFirst<TTuple, TMax>, TEllipsis]
    : TakeFirst<TTuple, TMax>;

/**
 * **Join**`<TArr,[TSeparator],[TMax]>`
 *
 * Joins together an array of items into a string.
 *
 * - the _separator_ between items defaults to an empty string this can be
 * changed to whatever is needed
 * - non-string types will be converted to strings as best as possible
 * - specifying a value for `TMax` will truncate tuples which are greater
 * than the specified length and add an ellipsis marker as the last element
 *
 * **Related:** `Concat<TArr>`
 */
export type Join<
    TTuple extends readonly unknown[],
    TSeparator extends string = "",
    TMax extends number | null = null,
    TEllipsis extends string | false = "...",
> = IsWideArray<TTuple> extends true
? TTuple extends (infer Type)[]
    ? Type[]
    : unknown[]

: TMax extends number
    ? IsGreaterThan<TTuple["length"], TMax> extends true
        ? Process<Slicer<ToStringArray<TTuple>, TMax, TEllipsis>, TSeparator>
        : Process<ToStringArray<TTuple>, TSeparator>
    : Process<ToStringArray<TTuple>, TSeparator>;
