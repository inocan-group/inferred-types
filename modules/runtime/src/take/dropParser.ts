import type {
    AppendToLast,
    As,
    AsArray,
    LongestToStartWith,
    Mutable,
    StartsWith,
    StripLeading
} from "inferred-types/types";
import { createFnWithProps } from "inferred-types/runtime";



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

/**
 * prevents a trailing empty space in the
 * "dropped" property.
 */
type RemoveEmptyDrop<
    T extends readonly string[]
> = T extends [
    ...infer LeadIn extends readonly string[],
    infer Last extends string
]
    ? Last extends ""
        ? LeadIn
        : T
: T;

/**
 * **AsDropResult**`<TContent, TRules>`
 *
 * A type utility which results the runtime's eventual parsing work.
 * The resultant type will will be a `DropResult` type which exposes:
 *
 * - the `kept` property is a string literal representing what
 *   of the original content was "kept".
 * - the `dropped` property is an array of string literals representing
 *   the parts/sub-strings which were removed.
 * - due to the inclusion of a `toString()` method, the returned `DropResult`
 *   object can be easily be serialized into the `kept` property which is
 *   typically what people want to extract.
 */
export type AsDropResult<
    TContent extends string,
    TRules extends readonly DropRule[],
    TState extends "keep" | readonly string[] = "keep",
    TKept extends string = "",
    TDropped extends readonly string[] = []
> = MatchRule<TContent,TRules,TState> extends [
    infer NewState extends "keep" | readonly string[],
    infer Extracted extends string
]
    ? AsDropResult<
        StripLeading<TContent,Extracted>,
        TRules,
        NewState,
        // "kept" property
        NewState extends "keep"
            ? `${TKept}${Extracted}` // moving to "keep",
            : TKept, // moving out of "keep"
        // "dropped" property
        NewState extends "keep"
            ? [
                ...TDropped,
                "" // start a new string
            ]
            : AppendToLast<TDropped, Extracted>
    >
: TContent extends `${infer Head extends string}${infer Rest}`
    ? TState extends "keep"
        ? AsDropResult<
            Rest,
            TRules,
            TState,
            `${TKept}${Head}`,
            TDropped
        >
        : AsDropResult<
            Rest,
            TRules,
            TState,
            TKept,
            AppendToLast<TDropped, Head>
        >
: {
    kind: "drop-result";
    kept: TKept;
    dropped: RemoveEmptyDrop<TDropped>;
    toString(): TKept;
};

/**
 * **DropRulePolicy**
 *
 * Determines how the matches to `enter` and `exit` tokens are included in
 * the **kept** or **dropped** properties:
 *
 * - `inclusive` - means that the `enter` and `exit` tokens
 *   will be added to the **kept** property.
 * - `exclusive` - means the `enter` and `exit` tokens will
 *   will be added to the dropped segments
 * - `drop-enter` - the `enter` tokens will be dropped
 *   but the `exit` tokens will still be added to the **kept**
 *   property
 * - `drop-exit` - the `exit` tokens will be dropped but the
 *   `enter` tokens will still be added to the **kept** property
 */
export type DropRulePolicy = "inclusive" | "exclusive" | "drop-enter" | "drop-exit";

export type DropRule = {
    /**
     * the sub-strings which will push the parser _into_
     * the "drop" state.
     */
    enter: string |  string[];
    /**
     * the sub-strings which will push the parser _into_
     * the "keep" state.
     */
    exit: string |  string[];

    /**
     * You may optionally choose to state the _matching policy_:
     *
     * - `inclusive` - means that the `enter` and `exit` tokens
     *   will be added to the **kept** property.
     * - `exclusive` - means the `enter` and `exit` tokens will
     *   will be added to the dropped segments
     * - `drop-enter` - the `enter` tokens will be dropped
     *   but the `exit` tokens will still be added to the **kept**
     *   property
     * - `drop-exit` - the `exit` tokens will be dropped but the
     *   `enter` tokens will still be added to the **kept** property
     *
     * By default the **policy** is set to `inclusive`.
     *
     * @default "inclusive"
     */
    policy?: DropRulePolicy;
}

/** KV component of `DropParser` */
type DropParserKv<
    T extends readonly DropRule[]
> = {
    kind: "drop-parser";
    rules: T;
    kept: string;
    dropped: string[]
}

/** function component of `DropParser` */
type DropParserFn<
    T extends readonly DropRule[]
> = <U extends string>(content: U) => AsDropResult<U,T>;

/**
 * **DropParser**`<T>`
 *
 * A configured drop parser ready for content to be parsed.
 */
export type DropParser<
    T extends readonly DropRule[]
> = DropParserKv<T> & DropParserFn<T>;


/**
 * **dropParser**`(...rules) -> (content) -> DropResult`
 *
 * The drop parser is meant to allow for a set of user defined
 * rules to be configured which will be used to switch the
 * state between "keep" (default) and "drop".
 *
 * 1. first call defines the rules to be used and returns a
 *   reusable function to use these rules to parse strings.
 *     - a rule consists of an `enter` and `exit` configuration
 *     - the `enter` condition is a string -- _or set of strings_
 *       -- which the parser will look for at the head of the parse
 *       string
 *         - when found the "state" of the parser will be moved from
 *         "keep" to "drop"
 *     - the `exit` condition provides an inverse function:
 *         - any string -- _or set of strings_ -- defined will be
 *           used to move the parser's state back to "keep"
 * 2. second call is to pass in the content to be parsed
 *     - the result should be a valid `DropResult` key/value
 *       dictionary
 *     - the `DropResult` is a dictionary of properties which
 *       include the `kept` property (typically what a caller is
 *       most concerned about)
 *     - the dictionary's `toString()` method also provides a
 *       type safe way of getting the `kept` property too.
 *
 */
export function dropParser<const T extends readonly DropRule[]>(...rules: T): DropParser<As<Mutable<T>, readonly DropRule[]>> {
    const kv = {
        kind: "drop-parser",
        rules: (rules as As<Mutable<T>, readonly DropRule[]>),
        kept: "",
        dropped: []
    } satisfies DropParserKv<As<Mutable<T>, readonly DropRule[]>>;

    const fn: DropParserFn<T> = <const U extends string>(content: U) => {
        // TODO: build out runtime implementation
        // make sure to implement the `.toString()` function and
        // have it return just the `kept` property.
        return null as unknown as AsDropResult<U,T>
    }

    return createFnWithProps(fn, kv) as DropParser<As<Mutable<T>, readonly DropRule[]>>;
}


