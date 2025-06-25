import { Err, IndexOf, Keys, Last, ReverseLookup, Values } from "inferred-types/types";

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
 *     - where `start` is a string union of all characters allowed to
 *      start the nesting
 *     - where `end` is either a string union of characters which
 *      terminate the nesting, or if `end` is _undefined_ then the
 *      nesting terminates when the characters in `start` end.
 */
export type NestingTuple = [ start: string, end: string | undefined ];



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
export type DefaultNesting = {
    "{": "}";
    "[": "]";
    "<": ">";
    "(": ")";
};

/**
 * nesting configuration which has matching opening and closing
 * brackets based on
 */
export type BracketNesting = {
    "{": "}";
    "[": "]";
    "<": ">";
    "(": ")";
};

/**
 * nesting configuration which treats all quote characters as
 * opening and closing characters.
 *
 * - if you start with `"` you end with `"`;
 * - if you start with `'`, you end with `'`.
 * - if you start with \`, you end with \`.
 */
export type QuoteNesting = {
    '"': '"',
    '\'': '\'',
    '`': '`'
};


/**
 * Tests the character `T` to see if it is a
 * terminal character in the Nesting configuration.
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
    ? TNesting[1] extends string
        ?  TChar extends TNesting[1]
            ? true
            : false
    : TNesting[1] extends undefined
        ? TChar extends TNesting[0]
            ? false
            : true
    : never
: never;



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
    ? [TNesting[1]] extends [string]
        ?  [TChar] extends [TNesting[1]]
            ? true
            : false
    : [TNesting[1]] extends [undefined]
        ? [TChar] extends [TNesting[0]]
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
