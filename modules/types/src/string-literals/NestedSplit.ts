import {
    Length,
    And,
    Extends,
    IsEqual,
    StringKeys,
    DoesExtend,
    Values,
    ReverseLookup,
    Last,
    Pop,
    Err,
    Join,
    IsGreaterThan,
    IsWideString,
    Or
} from "inferred-types/types";

/**
 * break when:
 *
 * - first character extends split character
 * - AND there are no elements on the nesting stack
 */
type ShouldBreak<
    T extends string,
    S extends string,
    N extends readonly string[]
> = And<[
    IsEqual<Length<N>, 0>,
    Extends<T,S>,
]>;

/**
 * Nest when:
 *
 * - The first character _extends_ a bracket entry character
 */
type ShouldNest<
    T extends string,
    B extends Record<string,string>
> = And<[
    DoesExtend<T,StringKeys<B>[number]>
]>;

/**
 * Unwrap when:
 *
 * - the first character _extends_ a bracket exit character
 * - AND when the nesting stack contains a matching entry
 * character in it's last position
 */
type ShouldUnwrap<
    T extends string,
    B extends Record<string,string>,
    N extends readonly string[]
> = And<[
    DoesExtend<T,Values<B>[number]>,
    IsGreaterThan<Length<N>, 0>,
    DoesExtend<
        ReverseLookup<B>[T],
        Last<N>
    >
]>;

type Policy = "omit" | "before" | "inline";


type Process<
    TContent extends string,
    TSplit extends string,
    TBrackets extends Record<string,string>,
    TPolicy extends Policy,
    TParts extends readonly string[] = [],
    TNesting extends readonly string[] = [],
    TPartial extends string = ""
> = TContent extends `${infer HEAD}${infer REST}`
? ShouldUnwrap<
    HEAD,
    TBrackets,
    TNesting
> extends true
    ? Process<
        REST,
        TSplit,
        TBrackets,
        TPolicy,
        TParts,
        Pop<TNesting>,
        `${TPartial}${HEAD}`
    >
: ShouldBreak<
    HEAD,TSplit,TNesting
> extends true
    ? Process<
        REST,
        TSplit,
        TBrackets,
        TPolicy,
        [
            ...TParts,
            ...(
                TPolicy extends "before"
                    ? [`${TPartial}${HEAD}`]
                : TPolicy extends "omit"
                    ? [TPartial]
                : TPolicy extends "inline"
                    ? [TPartial,HEAD]
                : never
            )

        ], // parts
        TNesting,
        "" // reset
    >
: ShouldNest<
    HEAD,TBrackets
> extends true
    ? Process<
        REST,
        TSplit,
        TBrackets,
        TPolicy,
        TParts,
        [...TNesting, HEAD],
        `${TPartial}${HEAD}`
    >
    : Process<
        REST,
        TSplit,
        TBrackets,
        TPolicy,
        TParts,
        TNesting,
        `${TPartial}${HEAD}`
    >
: Length<TNesting> extends 0
? [...TParts, TPartial]
: Err<`nested-split/unbalanced`, `The Parse<...> utility had an imbalanced nesting with ${Length<TNesting>} nesting layers remaining: ${Join<TNesting, ", ">}`>;


type DefaultNesting = {
    "{":"}",
    "[": "]",
    "<":">",
    "(":")"
};

/**
 * **NestedSplit**`<TContent,TSplit,TNesting,[TPolicy]>`
 *
 * A split utility which splits `TContent` by `TSplit`
 * but unlike the `Split` utility it recognizes parts
 * of the string as being _nested_ into a different layer.
 *
 * - The `TNesting` generic defines the various "entry" and
 * "exit" characters involved the split.
 *      - the _keys_ are the entry conditions
 *      - the _values_ are the exit conditions
 * - Splits only take place when the nesting level is at
 * zero
 * - An error of the type `nested-split/unbalanced` will
 * occur when the nesting does not resolve back to zero
 * before completion
 * - The `TPolicy` settings defaults to "omit" which means
 * that
 * - If no nesting policy is provided then the default policy
 * is to use all bracket characters: `{ "{":"}", "[": "]", "<":">", "(":")" }`
 */
export type NestedSplit<
    TContent extends string,
    TSplit extends string,
    TNesting extends Record<string,string> = DefaultNesting,
    TPolicy extends Policy = "omit"
> = Or<[
    IsWideString<TContent>,
    IsWideString<TSplit>
]> extends true
? string[]
: Process<TContent,TSplit,TNesting, TPolicy>;




// DEBUGGING
// type T = "WeakMap<{id: number, data: Array<string>}, string>"
// type TParse = NestedSplit<T, ",", { "{": "}" }>
//      ^?


