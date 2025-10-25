import type {
    AfterFirst,
    AllLengthOf,
    And,
    Chars,
    DefaultNesting,
    Err,
    First,
    AsNestingConfig,
    GetNextLevelConfig,
    GetParentConfig,
    IsNestingMatchEnd,
    IsEntryToken,
    Last,
    Nesting,
    KnownNestingConfig,
    Or,
    Pop,
    ShallowBracketAndQuoteNesting,
    StrLen,
    ToStringLiteral,
    ToStringLiteral__Array
} from "inferred-types/types";

export type NestedSplitPolicy = "omit" | "before" | "inline" | "after";

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
 * Now supports hierarchical nesting by switching configs at each level
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
    TRootNesting extends Nesting = TNesting
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
                TRootNesting
            >
            : IsEntryToken<Head, TNesting> extends true
                // Entering nesting - switch to next-level config
                ? MultiConvertDirect<
                    Rest,
                    TSplit,
                    GetNextLevelConfig<Head, TNesting>,
                    TPolicy,
                    [...TStack, Head],
                    `${TWaiting}${Head}`,
                    TResult,
                    false,
                    TRootNesting
                >
                : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false, TRootNesting>
        : IsNestingMatchEnd<Head, TStack, GetParentConfig<TStack, TRootNesting>> extends true
            ? Pop<TStack>["length"] extends 0
                // Exiting to root level - restore root config
                ? MultiConvertDirect<
                    Rest,
                    TSplit,
                    TRootNesting,
                    TPolicy,
                    Pop<TStack>,
                    `${TWaiting}${Head}`,
                    TResult,
                    false,
                    TRootNesting
                >
                // Exiting to parent level - restore parent's next-level config
                : MultiConvertDirect<
                    Rest,
                    TSplit,
                    GetNextLevelConfig<Last<Pop<TStack>>, TRootNesting>,
                    TPolicy,
                    Pop<TStack>,
                    `${TWaiting}${Head}`,
                    TResult,
                    false,
                    TRootNesting
                >
            : IsEntryToken<Head, TNesting> extends true
                // Entering nesting while already nested - switch to next-level config
                ? MultiConvertDirect<
                    Rest,
                    TSplit,
                    GetNextLevelConfig<Head, TNesting>,
                    TPolicy,
                    [...TStack, Head],
                    `${TWaiting}${Head}`,
                    TResult,
                    false,
                    TRootNesting
                >
                // Regular character inside nesting
                : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false, TRootNesting>
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
    TPolicy extends NestedSplitPolicy
> = MultiConvertDirect<TContent, TSplit, TNesting, TPolicy, [], "", [], false, TNesting>;

/**
 * convert when split characters are only 1 character in length
 * Now supports hierarchical nesting by switching configs at each level
 */
type Convert<
    TChars extends readonly string[],
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy,
    TStack extends readonly string[] = [],
    TWaiting extends string = "",
    TResult extends string[] = [],
    TRootNesting extends Nesting = TNesting
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
            TRootNesting
        >
        : IsNestingMatchEnd<First<TChars>, TStack, GetParentConfig<TStack, TRootNesting>> extends true
            ? Pop<TStack>["length"] extends 0
                // Exiting to root level - restore root config
                ? Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    TRootNesting,
                    TPolicy,
                    Pop<TStack>,
                    `${TWaiting}${First<TChars>}`,
                    TResult,
                    TRootNesting
                >
                // Exiting to parent level - restore parent's next-level config
                : Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    GetNextLevelConfig<Last<Pop<TStack>>, TRootNesting>,
                    TPolicy,
                    Pop<TStack>,
                    `${TWaiting}${First<TChars>}`,
                    TResult,
                    TRootNesting
                >
            : IsEntryToken<First<TChars>, TNesting> extends true
                // Entering nesting - switch to next-level config
                ? Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    GetNextLevelConfig<First<TChars>, TNesting>,
                    TPolicy,
                    [...TStack, First<TChars>],
                    `${TWaiting}${First<TChars>}`,
                    TResult,
                    TRootNesting
                >
                // Regular character - continue with current config
                : Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    TNesting,
                    TPolicy,
                    TStack,
                    `${TWaiting}${First<TChars>}`,
                    TResult,
                    TRootNesting
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
 *      - the _values_ can be either:
 *        - simple string (exit token) for uniform nesting
 *        - `[exit, nextLevel]` tuple for hierarchical nesting
 * - Splits only take place when the nesting level is at
 * zero
 * - An error of the type `unbalanced/nested-split` will
 * occur when the nesting does not resolve back to zero
 * before completion
 * - The `TPolicy` setting defaults to "omit" which removes
 * split characters from the result
 * - If no nesting config is provided, the default is bracket
 * nesting (parens, square brackets, angle brackets, curlies)
 */
export type NestedSplit<
    TContent extends string,
    /** the split character(s) */
    TSplit extends string | readonly string[],
    TNesting extends Nesting | KnownNestingConfig = DefaultNesting,
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
                        AsNestingConfig<TNesting>,
                        TPolicy,
                        [],
                        "",
                        [],
                        AsNestingConfig<TNesting>
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
                            AsNestingConfig<TNesting>,
                            TPolicy,
                            [],
                            "",
                            [],
                            AsNestingConfig<TNesting>
                        >
                        : MultiConvert<
                            TContent,
                            TSplit,
                            AsNestingConfig<TNesting>,
                            TPolicy
                        >
                    : never;

// DEBUGGING
// type T = "WeakMap<{id: number, data: Array<string>}, string>"
// type TParse = NestedSplit<T, ",", { "{": "}" }>
//      ^?
