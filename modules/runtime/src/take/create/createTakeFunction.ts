import type {
    StaticTakeFunction__CallBack,
    StaticTakeFunction__Rtn
} from "inferred-types/runtime";
import type { LexerState } from "inferred-types/types";
import {
    createStaticTakeFunction,
    createTakeWhileFunction,
    err
} from "inferred-types/runtime";

type TakeFunctionKind = "static" | "start-end" | "while";

type StaticBuilder<_O extends TakeFunction__Options> = {
    /**
     * enumerate all the static elements which this function
     * will handle.
     */
    enum<TItems extends readonly [string, ...string[]]>(...items: TItems): {
        /** the callback function used to coerce into a `LexerState` */
        callback<
            const TCb extends StaticTakeFunction__CallBack<TItems>
        >(cb: TCb):
        <
            const TLexer extends LexerState<TParse, TTokens>,
            TParse extends string,
            TTokens extends readonly unknown[]
        >(state: TLexer) =>
        StaticTakeFunction__Rtn<
            TLexer,
            TItems,
            ReturnType<TCb>
        >;
    };
};

export type TakeFunction__Options = {
    /**
     * A character or tuple of characters which _must follow_
     * immediately after the END token is reached.
     *
     * - if multiple strings are provided they will be treated
     * as a union type.
     * - A common use case is to include whitespace characters.
     */
    mustFollow?: string | readonly string[];

    ignoreFollow?: string | readonly string[];

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
};

type Returns<K extends TakeFunctionKind, O extends TakeFunction__Options> = K extends "start-end"
    ? unknown
    : K extends "static"
        ? StaticBuilder<O>
        : K extends "while"
            ? any
            : never;

function staticBuilder<O extends TakeFunction__Options>(_opt: O) {
    const builder: StaticBuilder<O> = {
        enum<TItems extends readonly string[]>(...items: TItems) {
            return {
                callback(cb) {
                    return (lexer) => {
                        const result = createStaticTakeFunction(items, cb)(lexer);

                        return result;
                    };
                }
            };
        }
    };

    return builder;
}

/**
 * **createTakeFunction**`(kind,[ opt ]) -> kind specific api`
 *
 * A higher order builder function which allows you to choose a _kind_
 * of take function from the following:
 *
 * - Static Block
 *
 *      - configure a static set of variants to match on
 *      - provide a callback to map a match to a Lexer token
 *      - wrapper will automatically return `Unset` if no match
 *      is found
 *      - callback fn for mapping a match to a Lexer token (or return
 *      an Error as an outlet)
 *
 * - Start/End Block
 *
 *      - provide `start` and `end` characters which will be used
 *      for matching
 *
 * - While Block
 */
export function createTakeFunction<
    K extends TakeFunctionKind,
    O extends TakeFunction__Options
>(
    kind: K,
    opt: O = {} as O
): Returns<K, O> {
    switch (kind) {
        case "static":
            return staticBuilder(opt) as Returns<K, O>;
        case "start-end":
            return null as unknown as Returns<K, O>;
        case "while":
            return createTakeWhileFunction as Returns<K, O>;
        default:
            throw err;
    }
}
