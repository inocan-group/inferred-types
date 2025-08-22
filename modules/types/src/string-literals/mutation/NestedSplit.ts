import type {
    AfterFirst,
    AllLengthOf,
    And,
    Chars,
    DefaultNesting,
    Err,
    First,
    FromNesting,
    FromNamedNestingConfig,
    IsNestingMatchEnd,
    IsNestingStart,
    IsWideString,
    Nest,
    NestedString,
    Nesting,
    NestingConfig__Named,
    Or,
    Pop,
    Split,
    StrLen,
    ToStringLiteral,
    ToStringLiteral__Tuple
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
 * Processes a single NestedString segment for multi-character splitting
 * Only splits segments at level 0 that have no nested children
 */
type ProcessSegment<
    TSegment extends NestedString,
    TSplit extends string,
    TPolicy extends NestedSplitPolicy
> = TSegment["level"] extends 0
    ? TSegment["children"] extends readonly []
        ? ProcessTopLevelContent<TSegment["content"], TSplit, TPolicy>
        : [FromNesting<TSegment>] // Has nested children, preserve as-is
    : [FromNesting<TSegment>]; // Not level 0, preserve as-is

/**
 * Splits top-level content (level 0) by the multi-character split string
 */
type ProcessTopLevelContent<
    TContent extends string,
    TSplit extends string,
    TPolicy extends NestedSplitPolicy
> = Split<TContent, TSplit> extends infer Parts extends readonly string[]
    ? Parts["length"] extends 1
        ? [TContent] // No split occurred
        : TPolicy extends "omit"
            ? Parts
            : TPolicy extends "inline"
                ? InsertSplitInline<Parts, TSplit>
                : TPolicy extends "before"
                    ? AddSplitBefore<Parts, TSplit>
                    : TPolicy extends "after"
                        ? AddSplitAfter<Parts, TSplit>
                        : never
    : never;

/**
 * Inserts split string between parts for "inline" policy
 */
type InsertSplitInline<
    TParts extends readonly string[],
    TSplit extends string,
    TResult extends readonly string[] = []
> = TParts extends readonly [infer Head extends string, ...infer Rest extends readonly string[]]
    ? Rest extends readonly []
        ? [...TResult, Head]
        : InsertSplitInline<Rest, TSplit, [...TResult, Head, TSplit]>
    : TResult;

/**
 * Adds split string before each part (except first) for "before" policy
 */
type AddSplitBefore<
    TParts extends readonly string[],
    TSplit extends string,
    TResult extends readonly string[] = []
> = TParts extends readonly [infer Head extends string, ...infer Rest extends readonly string[]]
    ? Rest extends readonly []
        ? [...TResult, Head]
        : Rest extends readonly [infer Next extends string, ...infer RestRest extends readonly string[]]
            ? AddSplitBefore<[`${TSplit}${Next}`, ...RestRest], TSplit, [...TResult, Head]>
            : [...TResult, Head]
    : TResult;

/**
 * Adds split string after each part (except last) for "after" policy  
 */
type AddSplitAfter<
    TParts extends readonly string[],
    TSplit extends string,
    TResult extends readonly string[] = []
> = TParts extends readonly [infer Head extends string, ...infer Rest extends readonly string[]]
    ? Rest extends readonly []
        ? [...TResult, Head]
        : AddSplitAfter<Rest, TSplit, [...TResult, `${Head}${TSplit}`]>
    : TResult;

/**
 * Processes all segments and flattens results
 */
type ProcessAllSegments<
    TSegments extends readonly NestedString[],
    TSplit extends string,
    TPolicy extends NestedSplitPolicy,
    TResult extends readonly string[] = []
> = TSegments extends readonly [infer Head extends NestedString, ...infer Rest extends readonly NestedString[]]
    ? ProcessSegment<Head, TSplit, TPolicy> extends infer HeadResult extends readonly string[]
        ? ProcessAllSegments<Rest, TSplit, TPolicy, [...TResult, ...HeadResult]>
        : never
    : TResult;

/**
 * Checks if TContent starts with TSplit at the current position
 */
type StartsWith<TContent extends string, TSplit extends string> = 
    TContent extends `${TSplit}${infer _Rest}` ? true : false;

/**
 * Gets the rest of the string after removing TSplit from the beginning
 */
type AfterSplit<TContent extends string, TSplit extends string> = 
    TContent extends `${TSplit}${infer Rest}` ? Rest : never;

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
    TLastWasSplit extends boolean = false
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
                true
              >
            : IsNestingStart<Head, TNesting> extends true
                ? MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, [...TStack, Head], `${TWaiting}${Head}`, TResult, false>
                : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false>
        : IsNestingMatchEnd<Head, TStack, TNesting> extends true
            ? MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, Pop<TStack>, `${TWaiting}${Head}`, TResult, false>
            : IsNestingStart<Head, TNesting> extends true
                ? MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, [...TStack, Head], `${TWaiting}${Head}`, TResult, false>
                : MultiConvertDirect<Rest, TSplit, TNesting, TPolicy, TStack, `${TWaiting}${Head}`, TResult, false>
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
            { stack: ToStringLiteral__Tuple<TStack> }
        >;

/**
 * convert when split characters are more than 1 character in length
 */
type MultiConvert<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting,
    TPolicy extends NestedSplitPolicy
> = MultiConvertDirect<TContent, TSplit, TNesting, TPolicy>;

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
> = [] extends TChars
    ? TStack["length"] extends 0
        ? [...TResult, TWaiting]
        : Err<
            `unbalanced/nested-split`,
            `The nesting stack was unbalanced, so the nested split can not be completed!`,
            { stack: ToStringLiteral__Tuple<TStack> }
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
                            : never
        >
        : IsNestingMatchEnd<First<TChars>, TStack, TNesting> extends true
            ? Convert<
                AfterFirst<TChars>,
                TSplit,
                TNesting,
                TPolicy,
                Pop<TStack>,
        `${TWaiting}${First<TChars>}`,
        TResult
            >
            : IsNestingStart<First<TChars>, TNesting> extends true
                ? Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    TNesting,
                    TPolicy,
                    [...TStack, First<TChars>],
        `${TWaiting}${First<TChars>}`,
        TResult
                >

                : Convert<
                    AfterFirst<TChars>,
                    TSplit,
                    TNesting,
                    TPolicy,
                    TStack,
    `${TWaiting}${First<TChars>}`,
    TResult
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
        ? Convert<Chars<TContent>, TSplit[number], FromNamedNestingConfig<TNesting>, TPolicy>
        : Err<
            `invalid-nesting/nested-split`,
            `A tuple of strings were passed into to form a union type of characters which would provide the 'split', however, at least one of these were longer than a single character!`,
            { split: ToStringLiteral<TSplit>; content: TContent }
        >
    : TSplit extends string
        ? StrLen<TSplit> extends 1
            ? Convert<Chars<TContent>, TSplit, FromNamedNestingConfig<TNesting>, TPolicy>
            : MultiConvert<TContent, TSplit, FromNamedNestingConfig<TNesting>, TPolicy>
        : never;

// Process<TContent, TSplit, TNesting, TPolicy>;

// DEBUGGING
// type T = "WeakMap<{id: number, data: Array<string>}, string>"
// type TParse = NestedSplit<T, ",", { "{": "}" }>
//      ^?
