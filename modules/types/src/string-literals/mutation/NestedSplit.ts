import type {
    AfterFirst,
    AllLengthOf,
    And,
    Chars,
    DefaultNesting,
    Err,
    First,
    FromNamedNestingConfig,
    IsNestingMatchEnd,
    IsNestingStart,
    Nesting,
    NestingConfig__Named,
    Or,
    Pop,
    StrLen,
    ToStringLiteral,
    ToStringLiteral__Array
} from "inferred-types/types";

export type NestedSplitPolicy = "omit" | "before" | "inline" | "after";

/**
 * Helper type to determine if we're using quotes nesting mode.
 * In quotes mode, when already inside a quote, other quote types are treated as literals.
 */
type IsQuotesMode<TNesting extends Nesting> = TNesting extends Record<string, string>
    ? {
        [K in keyof TNesting]: K extends TNesting[K] ? (K extends '"' | "'" | "`" ? true : false) : false
    }[keyof TNesting] extends false
        ? false
        : true
    : false;

/** when a split character is found and there is no stack depth */
type SplitWithNoStack<
    TChar extends string,
    TSplit extends string,
    TStack extends readonly string[]
> = TChar extends TSplit
    ? TStack["length"] extends 0
        ? true
        : false
    : false;

/**
 * Checks if TContent starts with TSplit at the current position
 */
type StartsWith<TContent extends string, TSplit extends string>
    = TContent extends `${TSplit}${infer _Rest}` ? true : false;

/**
 * Gets the rest of the string after removing TSplit from the beginning
 */
type AfterSplit<TContent extends string, TSplit extends string>
    = TContent extends `${TSplit}${infer Rest}` ? Rest : never;

/**
 * Multi-character conversion using direct string processing
 */
type MultiConvertDirect<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy,
    TStack extends readonly string[] = [],
    TWaiting extends string = "",
    TResult extends string[] = [],
    TLastWasSplit extends boolean = false,
    TQuotesMode extends boolean = false
> = TContent extends `${infer Head}${infer Rest}`
    ? TStack["length"] extends 0
        ? StartsWith<TContent, TSplit> extends true
            ? MultiConvertDirect<
                AfterSplit<TContent, TSplit>,
                TSplit,
                TNesting,
                TPolicy,
                TStack,
                TPolicy extends "before"
                    ? TSplit
                    : "",
                TPolicy extends "omit"
                    ? [...TResult, TWaiting]
                    : TPolicy extends "inline"
                        ? [...TResult, TWaiting, TSplit]
                        : TPolicy extends "before"
                            ? TWaiting extends ""
                                ? TResult["length"] extends 0
                                    ? []
                                    : [...TResult, TWaiting]
                                : [...TResult, TWaiting]
                            : TPolicy extends "after"
                                ? [...TResult, `${TWaiting}${TSplit}`]
                                : never,
                true,
                TQuotesMode
            >
            : IsNestingStart<Head, TNesting> extends true
                ? MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, [...TStack, Head], `${TWaiting}${Head}`, TResult, false, TQuotesMode>
                : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false, TQuotesMode>
        : IsNestingMatchEnd<Head, TStack, TNesting> extends true
            ? MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, Pop<TStack>, `${TWaiting}${Head}`, TResult, false, TQuotesMode>
            : TQuotesMode extends false
                ? IsNestingStart<Head, TNesting> extends true
                    ? MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, [...TStack, Head], `${TWaiting}${Head}`, TResult, false, TQuotesMode>
                    : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false, TQuotesMode>
                : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false, TQuotesMode>
    : TStack["length"] extends 0
        ? TLastWasSplit extends true
            ? TWaiting extends ""
                ? [...TResult, ""] // Only add empty string if no waiting content
                : [...TResult, TWaiting, ""] // Add both waiting content and empty string after split
            : TWaiting extends ""
                ? TResult
                : [...TResult, TWaiting]
        : Err<
            `unbalanced/nested-split`,
            `The nesting stack was unbalanced, so the nested split can not be completed!`,
            { stack: ToStringLiteral__Array<TStack> }
        >;

/**
 * convert when split characters are more than 1 character in length
 */
type MultiConvert<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy,
    TQuotesMode extends boolean = false
> = MultiConvertDirect<TContent, TSplit, TNesting, TPolicy, [], "", [], false, TQuotesMode>;

/**
 * convert when split characters are only 1 character in length
 */
type Convert<
    TChars extends readonly string[],
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy,
    TStack extends readonly string[] = [],
    TWaiting extends string = "",
    TResult extends string[] = [],
    TQuotesMode extends boolean = false
> = [] extends TChars
    ? TStack["length"] extends 0
        ? [...TResult, TWaiting]
        : Err<
            `unbalanced/nested-split`,
            `The nesting stack was unbalanced, so the nested split can not be completed!`,
            { stack: ToStringLiteral__Array<TStack> }
        >
    : SplitWithNoStack<First<TChars>, TSplit, TStack> extends true
        ? Convert<
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
                            : never,
            TQuotesMode
        >
        : IsNestingMatchEnd<First<TChars>, TStack, TNesting> extends true
            ? Convert<
                AfterFirst<TChars>,
                TSplit,
                TNesting,
                TPolicy,
                Pop<TStack>,
                `${TWaiting}${First<TChars>}`,
                TResult,
                TQuotesMode
            >
            : Or<[
                TStack["length"] extends 0 ? true : false,
                TQuotesMode extends false ? true : false
            ]> extends true
                ? IsNestingStart<First<TChars>, TNesting> extends true
                    ? Convert<
                        AfterFirst<TChars>,
                        TSplit,
                        TNesting,
                        TPolicy,
                        [...TStack, First<TChars>],
                        `${TWaiting}${First<TChars>}`,
                        TResult,
                        TQuotesMode
                    >
                    : Convert<
                        AfterFirst<TChars>,
                        TSplit,
                        TNesting,
                        TPolicy,
                        TStack,
                        `${TWaiting}${First<TChars>}`,
                        TResult,
                        TQuotesMode
                    >
                : Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    TNesting,
                    TPolicy,
                    TStack,
                    `${TWaiting}${First<TChars>}`,
                    TResult,
                    TQuotesMode
                >;

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
    /** the split character(s) */
    TSplit extends string | readonly string[],
    TNesting extends Nesting | NestingConfig__Named = DefaultNesting,
    TPolicy extends NestedSplitPolicy = "omit"
>
    = string extends TContent
        ? string[]
        : string extends TSplit
            ? string[]
            : TSplit extends readonly string[]
                ? AllLengthOf<TSplit, 1> extends true
                    ? Convert<
                        Chars<TContent>,
                        TSplit[number],
                        FromNamedNestingConfig<TNesting>,
                        TPolicy,
                        [],
                        "",
                        [],
                        IsQuotesMode<FromNamedNestingConfig<TNesting>>
                    >
                    : Err<
                        `invalid-nesting/nested-split`,
                        `A tuple of strings were passed into to form a union type of characters which would provide the 'split', however, at least one of these were longer than a single character!`,
                        { split: ToStringLiteral<TSplit>; content: TContent }
                    >
                : TSplit extends string
                    ? StrLen<TSplit> extends 1
                        ? Convert<
                            Chars<TContent>,
                            TSplit,
                            FromNamedNestingConfig<TNesting>,
                            TPolicy,
                            [],
                            "",
                            [],
                            IsQuotesMode<FromNamedNestingConfig<TNesting>>
                        >
                        : MultiConvert<
                            TContent,
                            TSplit,
                            FromNamedNestingConfig<TNesting>,
                            TPolicy,
                            IsQuotesMode<FromNamedNestingConfig<TNesting>>
                        >
                    : never;

// DEBUGGING
// type T = "WeakMap<{id: number, data: Array<string>}, string>"
// type TParse = NestedSplit<T, ",", { "{": "}" }>
//      ^?
