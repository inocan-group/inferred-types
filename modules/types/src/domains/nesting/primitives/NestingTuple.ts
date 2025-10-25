import type { Char, NestedException } from "inferred-types/types";
import { Nesting } from "./Nesting";

export type NestingTupleConfig = {
    /** the exit token */
    exit?: Char[],

    /**
     * optionally specify a new nesting configuration for child nodes
     */
    children?: Nesting;

    /**
     * optionally add exceptions to _entry_ or _exit_ tokens.
     */
    exception?: NestedException;
}


/**
 * **NestingTuple**
 *
 * A tuple which represents a nesting configuration:
 *
 * - **Simple**: `[start, end]`
 *   - `start` is a tuple of strings representing all characters allowed to start the nesting
 *   - `end` is either a tuple of characters which terminate the nesting, or if `end` is _undefined_
 *     then the nesting terminates when the characters in `start` end.
 *
 * - **Detailed**: `[start, { exit: [ a,b,c ]; children: {}, ...  } ]`
     - `start`
 *   - `config` - `exit`, `children` and/or `exception` props
 *
 * **Examples:**
 *
 * ```ts
 * // Simple Recursive Ruleset
 * type Simple = [
 *      [ "(", "[" ], // entry
 *      [ ")", "]"]   // exit
 * ]
 *
 * // Detailed Config
 * type Multi = [
 *      ["(", "["],   // entry
 *      { exit: "]", ")", children: {}, exclude: { exit: { ignoreFollowedBy: "!" } } }
 * ]
 */
export type NestingTuple = [
    entry: readonly Char[],
    exit: undefined | string[] | NestingTupleConfig
]
