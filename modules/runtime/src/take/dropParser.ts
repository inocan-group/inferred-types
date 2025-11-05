import { ESCAPE_CODE } from "inferred-types/constants";
import { AppendToLast, As, AsArray, LongestToStartWith, StartsWith, StripLeading } from "inferred-types/types";
import {  createFnWithProps } from "inferred-types/runtime";



type FindLongestMatch<
    TRules extends readonly DropRule[],
    TContent extends string
> = TRules extends [
    infer Head extends DropRule,
    ...infer Rest extends readonly DropRule[]
]
    ? LongestToStartWith<
        TContent,
        As<AsArray<Head["enter"]>, readonly string[]>
    > extends infer Found extends string
        ? [Found, As<AsArray<Head["exit"]>, readonly string[]> ]
        : FindLongestMatch<
            Rest,
            TContent
        >
: false;



type MatchRule<
    TContent extends string,
    TRules extends readonly DropRule[],
    TState extends "keep" | readonly string[]
> = TState extends "keep"
// we're in a "keep" state, we need to iterate over rules
// to see if we can get a match.
? FindLongestMatch<TRules, TContent> extends [
    infer Found extends string,
    infer ExitRules extends readonly string[]
]
    ? [
        newState: ExitRules,
        extract: Found
    ]
    : false


// We're in a "drop" state where TState represents "exits"
: StartsWith<TContent, TState[number]> extends true
    ? [ newState: "keep", extract: LongestToStartWith<TContent, As<TState, readonly string[]>> ]
    : false
;


export type DropResult<
    TContent extends string,
    TRules extends readonly DropRule[],
    TState extends "keep" | readonly string[] = "keep",
    TKept extends string = "",
    TDropped extends readonly string[] = []
> = MatchRule<TContent,TRules,TState> extends [
    infer NewState extends "keep" | readonly string[],
    infer Extracted extends string
]
    ? DropResult<
        StripLeading<TContent,Extracted>,
        TRules,
        NewState,
        NewState extends "keep"
            ? TKept
            : `${TKept}${Extracted}`,
        NewState extends "keep"
            ? [
                ...AppendToLast<TDropped, Extracted>,
                ""
            ]
            : TDropped
    >
: TContent extends `${infer Head extends string}${infer Rest}`
    ? TState extends "keep"
        ? DropResult<
            Rest,
            TRules,
            TState,
            `${TKept}${Head}`,
            TDropped
        >
        : DropResult<
            Rest,
            TRules,
            TState,
            TKept,
            AppendToLast<TDropped, Head>
        >
: {
    kind: "drop-result";
    kept: TKept;
    dropped: TDropped;
    toString(): string
}


;

export type DropRule = {
    enter: string | readonly string[];
    exit: string | readonly string[]
}

export type DropParser<T extends readonly DropRule[]> = {
    kind: "drop-parser";
    rules: T
} & (
    <U extends string>(content: U) => DropResult<U,T>
)



/**
 * dropParser**`(...rules) -> (content) -> DropResult`
 *
 * The drop parser is meant to allow for a set of user defined
 * rules to be configured which will be used to switch the
 * state between "keep" (default) and "drop".
 *
 * The characters and sub-strings processed during the "drop"
 * state will be removed from the the string. The final result
 * is all of the characters and sub-strings which were
 *
 */
export function dropParser<const T extends readonly DropRule[]>(...rules: T): DropParser<T> {
    const kv = {
        kind: "drop-parser",
        rules
    }

    const fn = <const U extends string>(content: U) => {
        // TODO: build out runtime implementation
        // make sure to implement the `.toString()` function and
        // have it return just the `kept` property.
        return null as unknown as DropResult<U,T>
    }

    return createFnWithProps(fn, kv) as DropParser<T>;
}


