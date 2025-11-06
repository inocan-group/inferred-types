import type { AppendToLast, As, LongestToStartWith, StartsWith, StripLeading } from "inferred-types/types";

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

/**
 * A user configurable rule to use with the `dropParser()` utility.
 *
 * **Related:** `FinalizedDropRule`
 */
export type DropRule = {
    /**
     * the sub-strings which will push the parser _into_
     * the "drop" state.
     */
    enter: string | string[];
    /**
     * the sub-strings which will push the parser _into_
     * the "keep" state.
     */
    exit: string | string[];

    /**
     * You may optionally choose to state the _matching policy_:
     *
     * - `inclusive` - means that the `enter` and `exit` tokens
     *   will be added to the **kept** property.
     * - `exclusive` - means the `enter` and `exit` tokens will
     *   will be added to the **dropped** segments
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
};

export type DropResult = {
    kind: "drop-result";
    kept: string;
    dropped: string[];
    toString(): string;
};

/**
 * looks through rules to find a match and if
 * there are more than one  `enter` or `exit` token(s)
 * provided in the match, use the _longest_ one as the
 * "extractor"
 *
 * - returns `{ extract: string, rule: Rule }` when found
 * - otherwise `false`
 */
type FindLongestMatch<
    TRules extends readonly FinalizedDropRule[],
    TContent extends string
> = TRules extends [
    infer Head extends FinalizedDropRule,
    ...infer Rest extends readonly FinalizedDropRule[]
]
    ? LongestToStartWith<
        TContent,
        Head["enter"]
    > extends infer Found extends string
        // match
        ? {
            extract: Found;
            rule: Head;
        }
        // no-match so iterate
        : FindLongestMatch<
            Rest,
            TContent
        >
// done iterating, no match
    : false;

type Match = {
    /** the extracted string representing a **enter** or **exit** token */
    extract: string;
    /**
     * if the new state is "drop" then store the entry `Rule` used
     */
    newState: "keep" | FinalizedDropRule;
    policy: DropRulePolicy;
};

/**
 * Looks for a rule that might match the _beginning_ of the
 * parse string.
 *
 * - when a match is found, returns a tuple of:
 *    - `{ newState, extract, policy }`
 *    - the `newState` is either:
 *       - when moving _into_ a **drop** state the matched `DropRule`
 *       - when moving _into_ a **keep** state the string "keep"
 */
type MatchRule<
    TContent extends string,
    TRules extends readonly FinalizedDropRule[],
    TState extends "keep" | FinalizedDropRule
> = TState extends "keep"
// we're in a "keep" state, we need to iterate over rules
// to see if we can get a match.
    ? FindLongestMatch<TRules, TContent> extends {
        extract: infer Extract extends string;
        rule: infer RuleDefn extends FinalizedDropRule;
    }
        ? As<{
            extract: Extract;
            newState: RuleDefn;
            policy: RuleDefn["policy"];
        }, Match>
        : false

// We're in a "drop" state where TState represents "exits"
    : TState extends {
        policy: infer Policy extends DropRulePolicy;
        enter: infer _Enter extends string[];
        exit: infer Exit extends string[];
    }
        ? StartsWith<
            TContent,
            Exit
        > extends true
            ? As<{
                extract: As<LongestToStartWith<TContent, Exit>, string>;
                newState: "keep";
                policy: Policy;
            }, Match>
            : false
        : never;

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

type IsMovingToKeepState<T extends "keep" | FinalizedDropRule> = T extends "keep"
    ? true
    : false;

/**
 * enforces the policy set for updating the `kept` property
 */
type PolicyHandlerForKept<
    TPolicy extends DropRulePolicy,
    // the new state
    TState extends "keep" | FinalizedDropRule,
    // the extracted token
    TExtracted extends string,
    TKept extends string
>
    = TPolicy extends "inclusive"
        ? IsMovingToKeepState<TState> extends true
            ? `${TKept}${TExtracted}` // exit token included
            : `${TKept}${TExtracted}` // enter token included
        : TPolicy extends "exclusive"
            ? IsMovingToKeepState<TState> extends true
                ? TKept // exit token excluded
                : TKept // enter token excluded
            : TPolicy extends "drop-enter"
                ? IsMovingToKeepState<TState> extends true
                    ? `${TKept}${TExtracted}` // exit token included
                    : TKept // enter token excluded
                : TPolicy extends "drop-exit"
                    ? IsMovingToKeepState<TState> extends true
                        ? TKept // exit token excluded
                        : `${TKept}${TExtracted}` // enter token included
                    : never;

/**
 * enforces the policy set for updating the `dropped` property
 */
type PolicyHandlerForDropped<
    TPolicy extends DropRulePolicy,
    // the new state
    TState extends "keep" | FinalizedDropRule,
    // the extracted token
    TExtracted extends string,
    TDropped extends readonly string[]
>
    = TPolicy extends "inclusive"
        ? IsMovingToKeepState<TState> extends true
            ? [...TDropped, ""] // exit token excluded but add empty token
            : TDropped // enter token excluded
        : TPolicy extends "exclusive"
            ? IsMovingToKeepState<TState> extends true
                ? [
                    ...AppendToLast<TDropped, TExtracted>,
                    ""
                ] // exit token included, new empty item
                : [...TDropped, TExtracted] // enter token included as new item
            : TPolicy extends "drop-enter"
                ? IsMovingToKeepState<TState> extends true
                    ? [...TDropped, ""] // exit token excluded but add empty token
                    : [...TDropped, TExtracted] // enter token included as new item
                : TPolicy extends "drop-exit"
                    ? IsMovingToKeepState<TState> extends true
                        ? [
                            ...AppendToLast<TDropped, TExtracted>,
                            ""
                        ] // exit token included, new empty item
                        : TDropped // enter token excluded
                    : never;

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
    TRules extends readonly FinalizedDropRule[],
    TState extends "keep" | FinalizedDropRule = "keep",
    TKept extends string = "",
    TDropped extends readonly string[] = []
>
    = string extends TContent
        ? DropResult

    // look for a token match
        : MatchRule<TContent, TRules, TState> extends {
            newState: infer NewState extends "keep" | FinalizedDropRule;
            extract: infer Extracted extends string;
            policy: infer Policy extends DropRulePolicy;
        }
        // token match found
            ? AsDropResult<
                StripLeading<TContent, Extracted>,
                TRules,
                NewState,
                // "kept" property
                PolicyHandlerForKept<Policy, NewState, Extracted, TKept>,
                // "dropped" property
                PolicyHandlerForDropped<Policy, NewState, Extracted, TDropped>
            >
        // no match, iterate over content by character until a match is found
        // no need to check "policies" as the policy only determines how to
        // associate **enter** or **exit** tokens
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
                : As<{
                    kind: "drop-result";
                    kept: TKept;
                    dropped: RemoveEmptyDrop<TDropped>;
                    toString(): TKept;
                }, DropResult>;

/**
 * A finalized `DropRule`
 */
export type FinalizedDropRule = {
    /** enter tokens */
    enter: string[];
    /** exit tokens */
    exit: string[];
    /** token policy */
    policy: DropRulePolicy;
};

/** KV component of `DropParser` */
export type DropParserKv<
    T extends readonly FinalizedDropRule[]
> = {
    kind: "drop-parser";
    rules: T;
    kept: string;
    dropped: string[];
};

/** function component of `DropParser` */
export type DropParserFn<
    T extends readonly FinalizedDropRule[]
> = <U extends string>(content: U) => AsDropResult<U, T>;

/**
 * **DropParser**`<T>`
 *
 * A configured drop parser ready for content to be parsed.
 */
export type DropParser<
    T extends readonly FinalizedDropRule[]
> = DropParserKv<T> & DropParserFn<T>;
