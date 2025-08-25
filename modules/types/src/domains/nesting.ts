import type { BRACKET_NESTING, QUOTE_NESTING, BRACKET_AND_QUOTE_NESTING } from "inferred-types/constants";
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
 * - the _values_ are END tokens which indicate _exiting_ a nesting level
 */
export type NestingKeyValue = Record<string, string>;

/**
 * A two element tuple which represents:
 *
 * - `[ start, end ]`
 *
 *     - where `start` is a tuple of strings representing all characters allowed to
 *      start the nesting
 *     - where `end` is either a tuple of characters which
 *      terminate the nesting, or if `end` is _undefined_ then the
 *      nesting terminates when the characters in `start` end.
 */
export type NestingTuple = [ start: readonly string[], end: readonly string[] | undefined ];

export type NestingConfig__Named = "default" | "brackets" | "quotes" | "brackets-and-quotes";

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
 * IsNestingTuple<T>
 *
 * A boolean-ish operator which returns `true` when `T` is a valid `NestingTuple`
 *
 * - if `Start` or `End` tuple elements are still a union type then this
 * return `boolean`
 * - when used in the runtime, however, it should resolve the union to a literal
 * - instead of returning `false` this utility returns an error which will help
 * debug the problem.
 *
 * **Related:**
 * - `IsNestingKeyValue<T>`
 * - `isNestingTuple(val)`, `isNestingKeyValue(val)`
 */
export type IsNestingTuple<T> = T extends [
    infer Start extends readonly string[],
    infer End extends readonly string[] | undefined
]
    ? [AllStringLiterals<Start>] extends [true]
        ? [AllLengthOf<Start, 1>] extends [true]
            ? [End] extends [readonly string[]]
                ? [AllStringLiterals<End>] extends [true]
                    ? [AllLengthOf<End, 1>] extends [true]
                        ? true
                        : Err<
                            `invalid-nesting/tuple`,
                            `the tuple being tested had END tokens which were longer than a single character!`,
                            { end: ToStringLiteral<End> }
                        >
                    : boolean
                : [End] extends [undefined]
                    ? true
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
 */
export type IsNestingKeyValue<T> = T extends Record<string, string>
    ? AllLengthOf<StringKeys<T>, 1> extends true
        ? AllLengthOf<As<Values<T>, readonly string[]>, 1> extends true
            ? true
            : Err<
                `invalid-nesting/key-value`,
                `Some of the values in this key-value were not a single character in length!`,
                { values: ToStringLiteral<Values<T>> }
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
    ? TStartChar extends keyof NestingKeyValue
        ? IndexOf<TNesting, TStartChar> extends infer ExitChar extends string
            ? ExitChar
            : never
        : Err<
            `invalid-lookup`,
            `GetNestingEnd<TStartChar,TNesting> got a start/entering character '${TStartChar}' which is NOT defined in the configuration (a NestingKeyValue config)!`,
            { config: TNesting }
        >
: [TNesting] extends [[infer StartingChars extends readonly string[], infer EndingChars extends readonly string[]]]
    ? TStartChar extends StartingChars
        ? EndingChars[number]
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
: _GetNestingEnd<As<TStartChar, string>,TNesting>;

/**
 * Tests the character `T` to see if it is a
 * terminal character in the Nesting configuration.
 */
export type IsNestingEnd<
    TChar extends string,
    TNesting extends Nesting
> = [string] extends [TChar]
    ? boolean
    : [TNesting] extends [NestingKeyValue]
        ? [TChar] extends [Values<TNesting>[number]]
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
 */
export type IsNestingMatchEnd<
    TChar extends string,
    TStack extends readonly string[],
    TNesting extends Nesting
> = [IsNestingEnd<TChar, TNesting>] extends [true]
    ? [TNesting] extends [NestingKeyValue]
        ? [Last<TStack>] extends [string]
            ? [TChar] extends [TNesting[Last<TStack>]]
                ? true
                : false
            : never
        : true
    : false;

export type IsNestingConfig<T> = IsNestingKeyValue<T> extends true
    ? true
    : IsNestingTuple<T> extends true
        ? true
        : false;
