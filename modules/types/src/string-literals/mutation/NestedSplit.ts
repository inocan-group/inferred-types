import type {
    AfterFirst,
    AllLengthOf,
    And,
    As,
    Chars,
    DefaultNesting,
    DoesExtend,
    Err,
    Extends,
    First,
    FromNamedNestingConfig,
    IsEqual,
    IsGreaterThan,
    IsNestingMatchEnd,
    IsNestingStart,
    IsWideString,
    Join,
    Last,
    Length,
    Nesting,
    NestingConfig__Named,
    Or,
    Pop,
    ReverseLookup,
    StringKeys,
    StrLen,
    ToStringLiteral,
    ToStringLiteral__Tuple,
    Values
} from "inferred-types/types";


export type NestedSplitPolicy = "omit" | "before" | "inline";


type P2<
    TChars extends readonly string[],
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy,
    TStack extends readonly string[] = [],
    TWaiting extends string = "",
    TResult extends string[] = [],
> = [] extends TChars
? TStack["length"] extends 0
    ? [...TResult, TWaiting]
    : Err<
        `unbalanced/nested-split`,
        `The nesting stack was unbalanced, so the nested split can not be completed!`,
        { stack: ToStringLiteral__Tuple<TStack> }
    >
: And<[
    First<TChars> extends TSplit ? true : false,
    TStack["length"] extends 0 ? true : false
]> extends true
    ? P2<
        AfterFirst<TChars>,
        TSplit,
        TNesting,
        TPolicy,
        TStack,
        TPolicy extends "before"
            ? First<TChars>
        : "",
        TPolicy extends "omit"
            ? [...TResult, TWaiting]
        : TPolicy extends "inline"
            ? [...TResult, TWaiting, First<TChars>]
        : TPolicy extends "before"
            ? And<[
                TWaiting extends "" ? true : false,
                TResult["length"] extends 0 ? true : false
            ]> extends true
                ? []
                : [...TResult, TWaiting]
        : TPolicy extends "after"
            ? [...TResult, `${TWaiting}${First<TChars>}`]
        : never
    >
    : IsNestingMatchEnd<First<TChars>,TStack,TNesting> extends true
        ? P2<
            AfterFirst<TChars>,
            TSplit,
            TNesting,
            TPolicy,
            Pop<TStack>,
            `${TWaiting}${First<TChars>}`,
            TResult
        >
    : IsNestingStart<First<TChars>,TNesting> extends true
        ? P2<
            AfterFirst<TChars>,
            TSplit,
            TNesting,
            TPolicy,
            [...TStack, First<TChars>],
            `${TWaiting}${First<TChars>}`,
            TResult
        >

    : P2<
        AfterFirst<TChars>,
        TSplit,
        TNesting,
        TPolicy,
        TStack,
        `${TWaiting}${First<TChars>}`,
        TResult
    >

;

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
 * - An error of the type `unbalanced/nested-split` will
 * occur when the nesting does not resolve back to zero
 * before completion
 * - The `TPolicy` settings defaults to "omit" which means
 * that
 * - If no nesting policy is provided then the default policy
 * is to use all bracket characters: `{ "{":"}", "[": "]", "<":">", "(":")" }`
 */
export type NestedSplit<
    TContent extends string,
    /** the split character(s) **/
    TSplit extends string | readonly string[],
    TNesting extends Nesting | NestingConfig__Named = DefaultNesting,
    TPolicy extends NestedSplitPolicy = "omit"
> = Or<[
    IsWideString<TContent>,
    IsWideString<TSplit>
]> extends true
    ? string[]
    : TSplit extends readonly string[]
        ? AllLengthOf<TSplit, 1> extends true
            ? P2<Chars<TContent>, TSplit[number], FromNamedNestingConfig<TNesting>, TPolicy>
            : Err<
                `invalid-nesting/nested-split`,
                `A tuple of strings were passed into to form a union type of characters which would provide the 'split', however, at least one of these were longer than a single character!`,
                { split: ToStringLiteral<TSplit>, content: TContent }
            >
        : TSplit extends string
            ? StrLen<TSplit> extends 1
                ? P2<Chars<TContent>, TSplit, FromNamedNestingConfig<TNesting>, TPolicy>
                : Err<
                    `invalid-nesting/nested-split`,
                    `A strings of more than one character was provided as the 'split' character; this is not allowed!`,
                    { split: TSplit, content: TContent }
                >
        : never;

    // Process<TContent, TSplit, TNesting, TPolicy>;

// DEBUGGING
// type T = "WeakMap<{id: number, data: Array<string>}, string>"
// type TParse = NestedSplit<T, ",", { "{": "}" }>
//      ^?
