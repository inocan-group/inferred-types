import type {
    BRACKET_AND_QUOTE_NESTING,
    BRACKET_NESTING,
    QUOTE_NESTING,
    SHALLOW_BRACKET_NESTING,
    SHALLOW_QUOTE_NESTING,
    SHALLOW_BRACKET_AND_QUOTE_NESTING
} from "inferred-types/constants";
import type {
    AllLengthOf,
    AllStringLiterals,
    As,
    Err,
    IndexOf,
    IsNull,
    Keys,
    Last,
    StringKeys,
    ToStringLiteral,
    Values
} from "inferred-types/types";

/**
 * **NestedString**
 *
 * A hierarchical representation of a string which uses
 * a `Nesting` configuration to determine when to move up
 * and down the hierarchy.
 *
 * - a root node will be level 0
 * - root nodes will always have `null` for both _enter_ and _exit_
 * characters
 * - only the origin node in a `NestedString` will be at level 0
 * - child nodes which have an `enter` character but no `exit`
 * character are considered "unbalanced"
 * - you can test if a node or any of their children are _unbalanced_
 * with the `IsBalanced<T>` utility.
 */
export type NestedString = {
    content: string;
    enterChar: string | null;
    exitChar: string | null;
    children: NestedString[];
    level: number;
};

/**
 * **NestingKeyValue**
 *
 * A key-value pair where:
 *
 * - the _keys_ are START tokens which indicate _entering_ a new nesting level
 * - the _values_ are either:
 *   - **Simple form**: END tokens (string) which indicate _exiting_ a nesting level
 *   - **Hierarchical form**: A tuple `[exit: string, nextLevel: Nesting]` where:
 *     - `exit` is the END token for this level
 *     - `nextLevel` is the nesting configuration to use inside this nesting level
 *
 * **Examples:**
 *
 * ```ts
 * // Simple (backward compatible)
 * type Simple = { "(": ")" }
 *
 * // Hierarchical - empty config inside quotes (shallow nesting)
 * type Shallow = { '"': ['"', {}] }
 *
 * // Hierarchical - different tokens at different levels
 * type Multi = { "(": [")", { "[": "]" }] }
 * ```
 */
export type NestingKeyValue = Record<
    string,
    string | readonly [exit: string, nextLevel: Nesting] | [exit: string, nextLevel: Nesting]
>;

/**
 * A tuple which represents nesting configuration:
 *
 * - **Simple (backward compatible)**: `[start, end]`
 *   - `start` is a tuple of strings representing all characters allowed to start the nesting
 *   - `end` is either a tuple of characters which terminate the nesting, or if `end` is _undefined_
 *     then the nesting terminates when the characters in `start` end.
 *
 * - **Hierarchical (new)**: `[start, end, nextLevel]`
 *   - Same as simple form, but with an optional third element
 *   - `nextLevel` is the `Nesting` configuration to use inside this nesting level
 *
 * **Examples:**
 *
 * ```ts
 * // Simple (backward compatible)
 * type Simple = [["(", "["], [")", "]"]]
 *
 * // Hierarchical - different tokens at next level
 * type Multi = [["(", "["], [")", "]"], { "{": "}" }]
 * ```
 */
export type NestingTuple =
    | [start: readonly string[], end: readonly string[] | undefined]
    | [start: readonly string[], end: readonly string[] | undefined, nextLevel: Nesting];

export type NestingConfig__Named =
    | "default"
    | "brackets"
    | "quotes"
    | "brackets-and-quotes"
    | "shallow-brackets"
    | "shallow-quotes"
    | "shallow-brackets-and-quotes";

export type FromNamedNestingConfig<T extends Nesting | NestingConfig__Named> = As<
    T extends Nesting
        ? T
        : T extends "default"
            ? DefaultNesting
            : T extends "brackets"
                ? BracketNesting
                : T extends "quotes"
                    ? QuoteNesting
                    : T extends "brackets-and-quotes"
                        ? BracketAndQuoteNesting
                        : T extends "shallow-brackets"
                            ? ShallowBracketNesting
                            : T extends "shallow-quotes"
                                ? ShallowQuoteNesting
                                : T extends "shallow-brackets-and-quotes"
                                    ? ShallowBracketAndQuoteNesting
                                    : never,
    Nesting
>;

/**
 * A means of defining the scope nesting by:
 *
 * 1. providing a `NestingKeyValue` of matching START and END tokens
 * 2. providing a tuple `NestingTuple` which uses it's own heuristic
 * to defining how nesting layers are identified
 */
export type Nesting = NestingKeyValue | NestingTuple;

/**
 * **DefaultNesting**
 *
 * Includes all of the standard start/stop tokens
 * for brackets as a key-value pairing to be used
 * with utilities that deal with `Nesting`.
 */
export type DefaultNesting = typeof BRACKET_NESTING;

/**
 * nesting configuration which has matching opening and closing
 * brackets based on bracketing characters.
 */
export type BracketNesting = typeof BRACKET_NESTING;

/**
 * nesting configuration which treats all quote characters as
 * opening and closing characters.
 *
 * - if you start with `"` you end with `"`;
 * - if you start with `'`, you end with `'`.
 * - if you start with \`, you end with \`.
 */
export type QuoteNesting = typeof QUOTE_NESTING;

/**
 * **BracketAndQuoteNesting**
 *
 * Mixes the `QuoteNesting` and `BracketNesting` strategies together to
 * form a paired nesting strategy which includes all bracket characters
 * and quotation characters.
 */
export type BracketAndQuoteNesting = typeof BRACKET_AND_QUOTE_NESTING;

/**
 * **ShallowBracketNesting**
 *
 * Hierarchical nesting configuration where bracket characters are recognized
 * at level 0, but inside brackets no further nesting is recognized.
 *
 * Useful for utilities that only care about root-level bracketing without
 * nested complexity.
 */
export type ShallowBracketNesting = typeof SHALLOW_BRACKET_NESTING;

/**
 * **ShallowQuoteNesting**
 *
 * Hierarchical nesting configuration where quote characters are recognized
 * at level 0, but inside quotes no further nesting is recognized.
 *
 * This treats quoted content as literals, perfect for split operations
 * that should ignore delimiters inside quotes.
 */
export type ShallowQuoteNesting = typeof SHALLOW_QUOTE_NESTING;

/**
 * **ShallowBracketAndQuoteNesting**
 *
 * Combines shallow bracket and quote nesting. Both brackets and quotes
 * are recognized at level 0, but inside either, no further nesting occurs.
 */
export type ShallowBracketAndQuoteNesting = typeof SHALLOW_BRACKET_AND_QUOTE_NESTING;

/**
 * IsNestingTuple<T>
 *
 * A boolean-ish operator which returns `true` when `T` is a valid `NestingTuple`
 *
 * - if `Start` or `End` tuple elements are still a union type then this
 * return `boolean`
 * - when used in the runtime, however, it should resolve the union to a literal
 * - instead of returning `false` this utility returns an error which will help
 * debug the problem.
 * - **NEW**: Now supports optional third element for hierarchical nesting
 *
 * **Related:**
 * - `IsNestingKeyValue<T>`
 * - `isNestingTuple(val)`, `isNestingKeyValue(val)`
 */
export type IsNestingTuple<T> = T extends [
    infer Start extends readonly string[],
    infer End extends readonly string[] | undefined,
    ...infer Rest
]
    ? [AllStringLiterals<Start>] extends [true]
        ? [AllLengthOf<Start, 1>] extends [true]
            ? [End] extends [readonly string[]]
                ? [AllStringLiterals<End>] extends [true]
                    ? [AllLengthOf<End, 1>] extends [true]
                        // Check if optional third element is valid Nesting (or absent)
                        ? Rest extends []
                            ? true
                            : Rest extends [infer NextLevel]
                                ? IsNestingConfig<NextLevel> extends true
                                    ? true
                                    : Err<
                                        `invalid-nesting/tuple`,
                                        `The optional 3rd element (nextLevel) must be a valid Nesting configuration`,
                                        { nextLevel: ToStringLiteral<NextLevel> }
                                    >
                                : Err<
                                    `invalid-nesting/tuple`,
                                    `NestingTuple can have at most 3 elements: [start, end, nextLevel?]`,
                                    { tuple: ToStringLiteral<T> }
                                >
                        : Err<
                            `invalid-nesting/tuple`,
                            `the tuple being tested had END tokens which were longer than a single character!`,
                            { end: ToStringLiteral<End> }
                        >
                    : boolean
                : [End] extends [undefined]
                    ? Rest extends []
                        ? true
                        : Rest extends [infer NextLevel]
                            ? IsNestingConfig<NextLevel> extends true
                                ? true
                                : Err<
                                    `invalid-nesting/tuple`,
                                    `The optional 3rd element (nextLevel) must be a valid Nesting configuration`,
                                    { nextLevel: ToStringLiteral<NextLevel> }
                                >
                            : Err<
                                `invalid-nesting/tuple`,
                                `NestingTuple can have at most 3 elements: [start, end, nextLevel?]`,
                                { tuple: ToStringLiteral<T> }
                            >
                    : Err<
                        `invalid-nesting/tuple`,
                        `The END segment (aka, 2nd element) of the tuple should be either undefined or a 'readonly string[]'. It was neither!`,
                        { end: ToStringLiteral<End>; tuple: ToStringLiteral<T> }
                    >
            : Err<
                `invalid-nesting/tuple`,
                `The START segment (aka, 1st element) had character strings which were longer than a single character! This is not allowed.`,
                { start: ToStringLiteral<Start>; tuple: ToStringLiteral<T> }
            >
        : false
    : false;

/**
 * Returns `true` if `T` is a valid `NestingKeyValue` otherwise returns a `invalid-nesting`
 * Error
 *
 * **NEW**: Now supports both:
 * - Simple form: `{ "(": ")" }` (values are strings)
 * - Hierarchical form: `{ "(": [")", {}] }` (values are [exit, nextLevel] tuples)
 * - Mixed form: `{ "(": [")", {}], "[": "]" }` (some values strings, some tuples)
 */
export type IsNestingKeyValue<T> = T extends Record<string, infer V>
    ? AllLengthOf<StringKeys<T>, 1> extends true
        // Check if ALL values are valid (either strings or tuples)
        ? V extends string
            // All values are simple strings
            ? AllLengthOf<As<Values<T>, readonly string[]>, 1> extends true
                ? true
                : Err<
                    `invalid-nesting/key-value`,
                    `Some of the values in this key-value were not a single character in length!`,
                    { values: ToStringLiteral<Values<T>> }
                >
            : V extends [infer Exit extends string, infer NextLevel]
                // All values are hierarchical tuples
                ? Exit extends string
                    ? Exit["length"] extends 1
                        ? IsNestingConfig<NextLevel> extends true
                            ? true
                            : Err<
                                `invalid-nesting/key-value`,
                                `The nextLevel configuration in the hierarchical tuple must be a valid Nesting config`,
                                { nextLevel: ToStringLiteral<NextLevel> }
                            >
                        : Err<
                            `invalid-nesting/key-value`,
                            `The exit token (first element of hierarchical tuple) must be a single character`,
                            { exit: ToStringLiteral<Exit> }
                        >
                    : Err<
                        `invalid-nesting/key-value`,
                        `The exit token must be a string`,
                        { exit: ToStringLiteral<Exit> }
                    >
                : V extends readonly [infer Exit extends string, infer NextLevel]
                    // All values are readonly hierarchical tuples
                    ? Exit extends string
                        ? Exit["length"] extends 1
                            ? IsNestingConfig<NextLevel> extends true
                                ? true
                                : Err<
                                    `invalid-nesting/key-value`,
                                    `The nextLevel configuration in the hierarchical tuple must be a valid Nesting config`,
                                    { nextLevel: ToStringLiteral<NextLevel> }
                                >
                            : Err<
                                `invalid-nesting/key-value`,
                                `The exit token (first element of hierarchical tuple) must be a single character`,
                                { exit: ToStringLiteral<Exit> }
                            >
                        : Err<
                            `invalid-nesting/key-value`,
                            `The exit token must be a string`,
                            { exit: ToStringLiteral<Exit> }
                        >
                    // Mixed values (union type) - validate each member
                    : V extends string | readonly [string, Nesting] | [string, Nesting]
                        ? true  // Accept mixed configs
                        : Err<
                            `invalid-nesting/key-value`,
                            `Values must be either strings or [exit, nextLevel] tuples`,
                            { values: ToStringLiteral<V> }
                        >
        : Err<
            `invalid-nesting/key-value`,
            `Some of the keys in this key-value were not a single character in length!`,
            { keys: ToStringLiteral<StringKeys<T>> }
        >
    : Err<
        `invalid-nesting/key-value`,
        `Not a key-value type!`,
        { type: ToStringLiteral<T> }
    >;

/**
 * Tests the character `T` to see if it is a
 * starting character in the Nesting configuration.
 */
export type IsNestingStart<
    TChar extends string,
    TNesting extends Nesting
> = [string] extends [TChar]
    ? boolean
    // Handle empty config {} - no starting characters
    : [TNesting] extends [Record<string, never>]
        ? false
        : [Keys<TNesting>] extends [never]
            ? false
            : [TNesting] extends [NestingKeyValue]
                ? [TChar] extends [Keys<TNesting>[number]]
                    ? true
                    : false
                : [TNesting] extends [NestingTuple]
                    ? TNesting[0] extends readonly string[]
                        ? TChar extends TNesting[0][number]
                            ? true
                            : false
                        : never
                    : never;

type _GetNestingEnd<
    TStartChar extends string,
    TNesting extends Nesting
> = [TNesting] extends [NestingKeyValue]
    ? TStartChar extends keyof TNesting
        ? TNesting[TStartChar] extends infer Value
            // Handle hierarchical form (readonly tuple)
            ? Value extends readonly [infer Exit extends string, infer _NextLevel]
                ? Exit
                // Handle hierarchical form (mutable tuple)
                : Value extends [infer Exit extends string, infer _NextLevel]
                    ? Exit
                    // Handle simple form (string)
                    : Value extends string
                        ? Value
                        : never
            : never
        : Err<
            `invalid-lookup`,
            `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TStartChar}' which is NOT defined in the configuration (a NestingKeyValue config)!`,
            { config: TNesting }
        >
    : [TNesting] extends [[infer StartingChars extends readonly string[], infer EndingChars extends readonly string[], ...infer _Rest]]
        ? TStartChar extends StartingChars[number]
            ? EndingChars extends readonly string[]
                ? EndingChars[number]
                : never
            : Err<
                "invalid-lookup",
            `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TStartChar}' which is NOT defined in the configuration (a NestingTuple config)!`,
            { config: TNesting }
            >
        : [TNesting] extends [[infer StartingChars extends readonly string[], infer EndingChars extends readonly string[]]]
            ? TStartChar extends StartingChars[number]
                ? EndingChars extends readonly string[]
                    ? EndingChars[number]
                    : never
                : Err<
                    "invalid-lookup",
                `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TStartChar}' which is NOT defined in the configuration (a NestingTuple config)!`,
                { config: TNesting }
                >
            : never;

/**
 * **GetNestingEnd**`<TStartChar, TNesting>`
 *
 * Provides the END/EXIT character(s) which the passed in `TStartChar` character
 * along with the configuration of `TNesting` match up to.
 *
 * - if no match is found a `Err<'invalid-lookup'>` will be returned.
 * - when using a `NestingTuple` config, the return value will typically be a _union_ of exit characters
 * - in contrast, a `NestingKeyValue` config will typically just return a single character variant to
 * match with.
 */
export type GetNestingEnd<
    TStartChar extends string | null,
    TNesting extends Nesting
> = [IsNull<TStartChar>] extends [true]
    ? null
    : [string] extends [TStartChar]
        ? string | Err<`invalid-lookup`>
        : _GetNestingEnd<As<TStartChar, string>, TNesting>;

/**
 * **GetNextLevelConfig**`<TStartChar, TNesting>`
 *
 * Extracts the nesting configuration to use inside a nesting level that
 * starts with `TStartChar`.
 *
 * - For **simple configs** (string values): Returns the same config (no hierarchy)
 * - For **hierarchical key-value** configs: Extracts `nextLevel` from `[exit, nextLevel]` tuple
 * - For **hierarchical tuple** configs: Extracts the third element if present
 * - If character is not in config: Returns the same config
 *
 * **Examples:**
 *
 * ```ts
 * // Simple config - returns same
 * type A = GetNextLevelConfig<"(", { "(": ")" }>;  // { "(": ")" }
 *
 * // Hierarchical - extract empty config
 * type B = GetNextLevelConfig<'"', { '"': ['"', {}] }>;  // {}
 *
 * // Hierarchical - extract nested config
 * type C = GetNextLevelConfig<"(", { "(": [")", { "[": "]" }] }>;  // { "[": "]" }
 * ```
 */
export type GetNextLevelConfig<
    TStartChar extends string,
    TNesting extends Nesting
> = [TNesting] extends [NestingKeyValue]
    ? TStartChar extends keyof TNesting
        ? TNesting[TStartChar] extends readonly [infer _Exit extends string, infer NextLevel]
            // Hierarchical form (readonly tuple) - extract nextLevel
            ? NextLevel
            : TNesting[TStartChar] extends [infer _Exit extends string, infer NextLevel]
                // Hierarchical form (mutable tuple) - extract nextLevel
                ? NextLevel
                // Simple form - return same config
                : TNesting
        // Character not in config - return same config
        : TNesting
    : [TNesting] extends [[infer _Start extends readonly string[], infer _End extends readonly string[] | undefined, infer NextLevel]]
        // Hierarchical tuple (3 elements) - extract third element
        ? NextLevel
        // Simple tuple (2 elements) - return same config
        : TNesting;

/**
 * Helper to rebuild config by applying GetNextLevelConfig for each element except the last
 */
type _GetParentConfigRecursive<
    TStack extends readonly string[],
    TRootNesting extends Nesting,
    TCurrentConfig extends Nesting = TRootNesting
> = TStack extends readonly [infer First extends string, infer Second extends string, ...infer Rest extends string[]]
    ? Rest["length"] extends 0
        // Only two elements left - apply config for first, return that (don't process second)
        ? GetNextLevelConfig<First, TCurrentConfig>
        // More than two - apply config for first and recurse
        : _GetParentConfigRecursive<
            [Second, ...Rest],
            TRootNesting,
            GetNextLevelConfig<First, TCurrentConfig>
        >
    : TCurrentConfig;

/**
 * **GetParentConfig**`<TStack, TRootNesting>`
 *
 * Reconstructs the nesting config that was active when the last entry character (top of stack) was seen.
 *
 * This is needed for `IsNestingMatchEnd` to look up the correct exit token in hierarchical configs.
 *
 * **Logic:**
 * - If stack has ≤1 element: parent is root level
 * - Otherwise: apply `GetNextLevelConfig` for each level except the last
 *
 * **Examples:**
 * ```ts
 * // Stack ["["], root { "[": "]" } -> parent is root
 * type A = GetParentConfig<["["], { "[": "]" }>;  // { "[": "]" }
 *
 * // Stack ["{", "["], root { "{": ["}", { "[": "]" }] }
 * // Parent config at level 1 where "[" was seen
 * type B = GetParentConfig<["{", "["], { "{": ["}", { "[": "]" }] }>;  // { "[": "]" }
 * ```
 */
export type GetParentConfig<
    TStack extends readonly string[],
    TRootNesting extends Nesting
> = TStack["length"] extends 0 | 1
    ? TRootNesting
    : _GetParentConfigRecursive<TStack, TRootNesting>;

/**
 * Helper to extract exit tokens from NestingKeyValue values
 * Handles both simple (string) and hierarchical ([exit, nextLevel]) forms
 * Also handles readonly tuples from constants
 */
type ExtractExitTokens<V> = V extends readonly [infer Exit extends string, infer _NextLevel]
    ? Exit
    : V extends [infer Exit extends string, infer _NextLevel]
        ? Exit
        : V extends string
            ? V
            : never;

/**
 * Tests the character `T` to see if it is a
 * terminal character in the Nesting configuration.
 *
 * **NEW**: Now properly handles hierarchical configs by extracting exit tokens
 * from [exit, nextLevel] tuples
 */
export type IsNestingEnd<
    TChar extends string,
    TNesting extends Nesting
> = [string] extends [TChar]
    ? boolean
    : [TNesting] extends [NestingKeyValue]
        // Extract exit tokens from values (handles both string and [exit, nextLevel])
        ? [TChar] extends [ExtractExitTokens<Values<TNesting>[number]>]
            ? true
            : false
        : [TNesting] extends [NestingTuple]
            ? [TNesting[1]] extends [readonly string[]]
                ? [TChar] extends [TNesting[1][number]]
                    ? true
                    : false
                : [TNesting[1]] extends [undefined]
                    ? [TChar] extends [TNesting[0][number]]
                        ? false
                        : true
                    : never
            : never;

/**
 * **IsNestingMatchEnd**`<TChar, TStack, TNesting>`
 *
 * Tests the `TChar` to see if it is not only a valid
 * _ending_ token but that it is _right_ ending token
 * based on what's on the stack.
 *
 * **NEW**: Now properly handles hierarchical configs by extracting exit tokens
 * from [exit, nextLevel] tuples
 */
export type IsNestingMatchEnd<
    TChar extends string,
    TStack extends readonly string[],
    TNesting extends Nesting
> = [IsNestingEnd<TChar, TNesting>] extends [true]
    ? [TNesting] extends [NestingKeyValue]
        ? [Last<TStack>] extends [string]
            ? TNesting[Last<TStack>] extends infer Value
                // Extract exit token from hierarchical or simple value
                ? [TChar] extends [ExtractExitTokens<Value>]
                    ? true
                    : false
                : never
            : never
        : true
    : false;

export type IsNestingConfig<T> = IsNestingKeyValue<T> extends true
    ? true
    : IsNestingTuple<T> extends true
        ? true
        : false;
