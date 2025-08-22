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
    IsWideString,
    Nesting,
    NestingConfig__Named,
    Or,
    Pop,
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
 * convert when split characters are more than 1 character in length
 */
type MultiConvert<
    TContent extends string,
    TSplit extends string,
    TNesting extends Nesting,

> = ;

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
            : Err<"invalid-split-char", `The NestedSplit<TContent,TSplit> utility requires that the TSplit generic is a single character. It can be a union of single characters but it should never be more than one character.`>
        : never;

// Process<TContent, TSplit, TNesting, TPolicy>;

// DEBUGGING
// type T = "WeakMap<{id: number, data: Array<string>}, string>"
// type TParse = NestedSplit<T, ",", { "{": "}" }>
//      ^?
