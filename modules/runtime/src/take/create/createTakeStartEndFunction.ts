import type { RuntimeTakeFunction } from "inferred-types/types";

export type Take__StartEndOptions = {
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

    handler?: RuntimeTakeFunction;
};

/**
 * **createTakeStartEndFunction**`(startEnd, opts) -> take fn`
 *
 * creates a `take` function which is based on a
 * **start** and **end** token(s).
 */
export function createTakeStartEndFunction<
    const TStartEnd extends Record<string, string>,
    const TOpt extends Take__StartEndOptions
>(
    startEnd: TStartEnd,
    opts: TOpt
) {
    return <TParse extends string>(str: TParse) => {

    };
}
