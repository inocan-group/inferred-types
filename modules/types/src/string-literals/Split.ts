import type {
    AfterFirst,
    Err,
    Filter,
    First,
    Flatten,
    IsStringLiteral,
    IsUnion,
    NonBreakingSpace,
    RemoveNever,
} from "inferred-types/types";

type Policy = "omit" | "before" | "after" | "inline";

type AppendToLast<
    T extends readonly string[],
    A extends string
> = T extends readonly [infer Only extends string]
    ? [`${Only}${A}`]
    : T extends readonly [...string[], infer Last extends string]
        ? T extends readonly [...infer Start, Last]
            ? [...Start, `${Last}${A}`]
            : never
        : never;

type S = `sep:${NonBreakingSpace}`;

type _Split<
    TContent extends string,
    TSep extends string,
    TResult extends readonly string[] = []
> = TContent extends ""
    ? TResult
    : TContent extends `${infer Head}${TSep}${infer Rest}`
        ? TContent extends `${Head}${infer Sep extends TSep}${Rest}`
            ? _Split<Rest, TSep, [...TResult, Head, `${S}${Sep}`]>
            : never
        : [...TResult, TContent];

type _SplitSeperator<
    TContent extends readonly string[],
    TSep extends string
> = Flatten<{
    [K in keyof TContent]: _Split<TContent[K], TSep>
}>;

type _SplitUnion<
    TContent extends readonly string[],
    TSep extends readonly string[],
    TPolicy extends Policy,
    TResult extends readonly string[] = []
> = [] extends TSep
    ? TResult
    : _SplitUnion<
        _SplitSeperator<TContent, First<TSep>> extends readonly string[]
            ? _SplitSeperator<TContent, First<TSep>>
            : never,
        AfterFirst<TSep>,
        TPolicy,
        _SplitSeperator<TContent, First<TSep>> extends readonly string[]
            ? TPolicy extends "omit"
                ? Filter<[..._SplitSeperator<TContent, First<TSep>>], S, "startsWith">
                : TPolicy extends "before"
                    ? BeforePolicy<[..._SplitSeperator<TContent, First<TSep>>]>
                    : TPolicy extends "after"
                        ? AfterPolicy<[..._SplitSeperator<TContent, First<TSep>>]>
                        : InlinePolicy<[..._SplitSeperator<TContent, First<TSep>>]>
            : never
    >;

type OmitPolicy<
    T extends readonly string[]
> = RemoveNever<{
    [K in keyof T]: T[K] extends `${S}${string}`
        ? never
        : T[K]
}>;

type BeforePolicy<
    T extends readonly string[],
    R extends readonly string[] = []
> = [] extends T
    ? R
    : BeforePolicy<
        AfterFirst<T>,
        First<T> extends `${S}${infer Sep}`
            ? R["length"] extends 0
                ? [Sep]
                : AppendToLast<R, Sep>
            : [...R, First<T>]
    >;

type AfterPolicy<
    T extends readonly string[],
    TSep extends string = "",
    R extends readonly string[] = []
> = [] extends T
    ? R
    : AfterPolicy<
        AfterFirst<T>,
        First<T> extends `${S}${infer Sep extends string}` ? Sep : "",
        First<T> extends `${S}${string}`
            ? R
            : [...R, `${TSep}${First<T>}`]
    >;

type InlinePolicy<
    T extends readonly string[],
    R extends readonly string[] = []
> = [] extends T
    ? R
    : InlinePolicy<
        AfterFirst<T>,
        First<T> extends `${S}${infer Rest}`
            ? [ ...R, Rest ]
            : [ ...R, First<T> ]
    >;

type Ensure<T> = T extends readonly string[]
    ? T
    : never;

/**
 * **Split**`<TContent,TSep,[TPolicy]>`
 *
 * Type conversion utility which receives a string `TContent`,
 * and _splits_ it into multiple string elements based on `TSep`.
 *
 * - `TSep` can be a _string literal_, a _tuple_ of string literals
 * - by default the seperator is _omitted_ from the result elements
 * but you can change this with `TPolicy`
 * - valid values for the policy are: `omit`, `before`, `after`, or `inline`
 */
export type Split<
    TContent extends string,
    TSep extends string | readonly string[],
    TPolicy extends Policy = "omit",
> = IsUnion<TSep> extends true
    ? Err<`split/union-type`, `The separator passed into Split was a union type; please convert this to a tuple and call Split with a Tuple seperator!`>
    : TSep extends readonly string[]
        ? _SplitUnion<[TContent], TSep, TPolicy>
        : TSep extends string
            ? IsStringLiteral<TContent> extends true
                ? TPolicy extends "omit"
                    ? Ensure<OmitPolicy<_Split<TContent, TSep>>>
                    : TPolicy extends "before"
                        ? Ensure<BeforePolicy<_Split<TContent, TSep>>>
                        : TPolicy extends "after"
                            ? Ensure<AfterPolicy<_Split<TContent, TSep>>>
                            : Ensure<InlinePolicy<_Split<TContent, TSep>>>
                : string[]
            : never;
