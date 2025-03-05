import type {
    AfterFirst,
    Err,
    ErrMsg,
    Filter,
    First,
    IsLiteral,
    IsStringLiteral,
    IsUnion,
    Second,
    UnionToTuple,
} from "inferred-types/types";

type Policy = "omit" | "before" | "after";

type Postfix<T extends string> = ["postfix", T];

type FixPostfix<
    T extends readonly (string | Postfix<string>)[],
    R extends readonly string[] = [],
> = [] extends T
    ? R
    : FixPostfix<
        First<T> extends ["postfix", string]
            ? AfterFirst<AfterFirst<T>>
            : AfterFirst<T>,
        First<T> extends string
            ? [...R, First<T>]
            : First<T> extends ["postfix", string]
                ? Second<T> extends string
                    ? [
                        ...R,
                `${First<T>[1]}${Second<T>}`,
                    ]
                    : never
                : never
    >;

type Convert<
    TContent extends string,
    TSep extends string,
    TPolicy extends Policy,
    TParts extends readonly (string | Postfix<string>)[] = [],
> = TContent extends `${string}${TSep}${string}`
    ? TContent extends `${infer Pre}${TSep}${infer Post}`
        ? Convert<
            Post,
            TSep,
            TPolicy,
            TPolicy extends "after"
                ? [...TParts, Pre, Postfix<TSep>]
                : TPolicy extends "before"
                    ? [ ...TParts, `${Pre}${TSep}`]
                    : [...TParts, Pre]
        >
        : ErrMsg<"invalid-content", `Split<T>: found separator ['${TSep}'] within string but can't infer it: ${TContent}`>
    : [...TParts, TContent];

type EachBlock<
    TContent extends readonly (string | Postfix<string>)[],
    TSep extends string,
    TPolicy extends Policy,
    TOutput extends readonly (string | Postfix<string>)[] = [],
> = [] extends TContent
    ? TOutput
    : EachBlock<
        AfterFirst<TContent>,
        TSep,
        TPolicy,
        First<TContent> extends string
            ? [
                ...TOutput,
                ...(Convert<First<TContent>, TSep, TPolicy> extends readonly (string | Postfix<string>)[]
                    ? Convert<First<TContent>, TSep, TPolicy>
                    : []
                ),
            ]
            : [
                ...TOutput,
                First<TContent>,
            ]
    >;

type Iterate<
    TContent extends readonly (string | Postfix<string>)[],
    TSep extends readonly string[],
    TPolicy extends Policy,
> = [] extends TSep
    ? FixPostfix<
        Filter<TContent, "", "equals">
    >
    : Iterate<
        EachBlock<TContent, First<TSep>, TPolicy>,
        AfterFirst<TSep>,
        TPolicy
    >;

type Process<
    TContent extends string,
    TSep extends string | readonly string[],
    TPolicy extends Policy = "omit",
> = IsLiteral<TSep> extends true
    ? TSep extends ""
        ? Err<
            "invalid-separator",
            `Split<T>: an empty string was used as a separator. Use Chars<T> if you want to split a string into characters!`
        >
        : TSep extends readonly string[]
            ? Iterate<[TContent], TSep, TPolicy>
            : TSep extends string
                ? Convert<TContent, TSep, TPolicy> extends readonly (string | Postfix<string>)[]
                    ? FixPostfix<Convert<TContent, TSep, TPolicy>>
                    : never
                : never
    : never;

/**
 * **Split**`<TContent,TSep,[TPolicy]>`
 *
 * Type conversion utility which receives a string `TContent`,
 * and _splits_ it into multiple string elements based on `TSep`.
 *
 * - `TSep` can be a _string_, a _union_ of string literals, or a tuple of strings
 * - typically you want to have the `TSep` _omitted_ from the result elements
 * but you can opt to include them by changing `TPolicy` to "include"
 *
 * **Note:** in general this utility is more consistently effective in splitting
 * than `SplitAlt` but there are instances where `SplitAlt` is more performant
 * in inference.
 */
export type Split<
    TContent extends string,
    TSep extends string | readonly string[],
    TPolicy extends Policy = "omit",
> = IsStringLiteral<TContent> extends true
    ? IsUnion<TSep> extends true
        ? UnionToTuple<TSep> extends readonly string[]
            ? Split<TContent, UnionToTuple<TSep>, TPolicy>
            : Err<"invalid-union", `Split<...> unable to convert union type to Tuple!`, {content: TContent}>
        : Process<TContent, TSep, TPolicy> extends readonly string[]
            ? Process<TContent, TSep, TPolicy>
            : never
    : string[];
