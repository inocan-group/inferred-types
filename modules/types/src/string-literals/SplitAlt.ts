import type {
    AfterFirst,
    As,
    BeforeLast,
    Chars,
    NotFilter,
    First,
    IsStringLiteral,
    IsUnion,
    IsWideType,
    Last,
    TupleToUnion,
    UnionToTuple,
} from "inferred-types/types";

type UnionPolicy = "omit" | "include";

type UnionSplit<
    TContent extends readonly string[],
    TSep extends string,
    TUnionPolicy extends UnionPolicy,
    TResult extends readonly string[] = [],
> = [] extends TContent
    ? TResult
    : // recurse
    UnionSplit<
        AfterFirst<TContent>, // advance to next character
        TSep,
        TUnionPolicy,
        First<TContent> extends TSep
            ? // split mark
            [
                ...TResult,
                ...(
                    TUnionPolicy extends "omit"
                        ? [""]
                        : [First<TContent>]
                ),
            ]
            : // add to existing
            Last<TResult, ""> extends string
                ? First<TContent> extends string
                    ? BeforeLast<TResult> extends readonly string[]
                        ? [
                            ...BeforeLast<TResult>,
                `${Last<TResult>}${First<TContent>}`,
                        ]
                        : never
                    : never
                : never
    >;

type LiteralSplit<
    TContent extends string,
    TSep extends string,
    TUnionPolicy extends UnionPolicy = "omit",
    TResults extends readonly string[] = [],
> = TContent extends `${infer Block}${TSep}${infer Rest}`
    ? LiteralSplit<
        Rest,
        TSep,
        TUnionPolicy,
        [
            ...TResults,
            TUnionPolicy extends "omit" ? Block : `${Block}${TSep}`,
        ]
    >
    : NotFilter<[...TResults, TContent], "">;

type Process<
    TContent extends string,
    TSep extends string | readonly string[],
    TUnionPolicy extends UnionPolicy = "omit",
> = IsWideType<TContent> extends true
    ? string
    : TSep extends readonly string[]
        ? TupleToUnion<TSep> extends string
            ? Chars<TContent> extends readonly string[]
                ? UnionSplit<Chars<TContent>, TupleToUnion<TSep>, TUnionPolicy>
                : never
            : never
        : TSep extends string
            ? LiteralSplit<TContent, TSep, TUnionPolicy>
            : never;

type PreProcess<TContent extends string, TSep extends string | readonly string[], TUnionPolicy extends UnionPolicy = "omit",
> = IsUnion<TSep> extends true
    ? UnionToTuple<TSep> extends readonly string[]
        ? Process<TContent, UnionToTuple<TSep>, TUnionPolicy>
        : never
    : Process<TContent, TSep, TUnionPolicy>;

/**
 * **SplitAlt**`<TContent,TSep,[TPolicy]>`
 *
 * Type conversion utility which receives a string `TContent`,
 * and _splits_ it into multiple string elements based on `TSep`.
 *
 * **Note:** this is the older implementation but can sometimes be
 * faster than `Split`
 */
export type SplitAlt<
    TContent extends string,
    TSep extends string | readonly string[],
    TPolicy extends UnionPolicy = "omit",
> = IsStringLiteral<TContent> extends true
    ? As<PreProcess<TContent, TSep, TPolicy>, readonly string[]>
    : string[];
