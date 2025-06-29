import type { Defined, IsFunction, Unset } from "inferred-types/types";
import {
    asArray,
    asChars,
    isUnset,
    stripLeading,
    unset
} from "inferred-types/runtime";
import { TypedFunction } from "@inferred-types/types";

type WhileOptions = {
    /**
     * A character or tuple of characters which _must follow_
     * immediately after the END token is reached.
     *
     * - if multiple strings are provided they will be treated
     * as a union type.
     * - A common use case is to include whitespace characters.
     */
    mustFollow?: string | readonly string[];

    /**
     * Allows you to specify START/END delimiters within
     * the parse string which indicate that nesting has
     * occurred.
     *
     * - the _keys_ of the `nesting` represent the nesting
     * entry
     * - the _values_ are the `nesting` exit
     */
    nesting?: Record<string, string>;

    /**
     * Allows you to specify characters which when encountered
     * will not break the matching of the parse string.
     *
     * The ignore characters are simply ignored, however, and
     * will not exist in the resultant take block.
     */
    ignore?: string | readonly string[];

    callback?: <R extends { head: string; rest: string }>(result: R) => [Unset, string] | [Defined, string];
};

function takeWhile(
    chars: string[],
    match: string[],
    opts: WhileOptions
): [Unset, string] | [string, string] {
    let head = "";

    for (const char of chars) {
        if (match.includes(char)) {
            head = `${head}${char}`;
        }
    }

    return head === ""
        ? [unset, chars.join()]
        : [head, stripLeading(chars.join(), head).trim()];
}

/**
 * creates a "take function" which resolves the end of it's string
 * by looking at a `while` condition.
 */
export function createTakeWhileFunction<
    const TMatch extends string | readonly string[],
    const TOpt extends WhileOptions
>(
    match: TMatch,
    opts: TOpt
): TOpt["callback"] extends TypedFunction
    ? [ReturnType<TOpt["callback"]>, string] | Error | Unset
    : Error | Unset | [string, string] {
    return <TParse extends string>(str: TParse) => {
        const [head, rest] = takeWhile(
            asChars(str),
            asArray(match) as string[],
            opts
        );

        if (isUnset(head)) {
            // did not find the pattern
            return unset as TOpt["callback"] extends TypedFunction
                ? [ReturnType<TOpt["callback"]>, string] | Error | Unset
                : Error | Unset | [string, string]
        }

        return [head, rest] as TOpt["callback"] extends TypedFunction
            ? [ReturnType<TOpt["callback"]>, string] | Error | Unset
            : Error | Unset | [string, string]


    };
}
