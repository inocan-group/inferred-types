import type {
    Find,
    LexerState,
    NoMatch,
    Or,
    StartsWith,
    StripLeading,
    TakeWrapper,
} from "inferred-types/types";
import { Never } from "inferred-types/constants";

import {
    find,
    isError
} from "inferred-types/runtime";

import { NO_MATCH } from "runtime/constants";
import {
    isDeltaReturn
} from "runtime/type-guards";

export type StaticTakeFunction__CallBack<
    TItems extends readonly string[],
    TState extends Required<LexerState<TParse, TTokens>>,
    TParse extends string = string,
    TTokens extends readonly unknown[] = readonly unknown[]
> = <
    T extends TItems[number]
>(payload: {
    /** the static token found at the HEAD of the parse string */
    found: T;
    /** the parse string and tokens (updated with latest token) */
    state: TState;
}
) => Error | NoMatch | LexerState<
    StripLeading<TState["parse"], T>,
    [...TTokens, unknown]
>;

export type StaticTakeFunction__Rtn<
    TState extends LexerState,
    TItems extends readonly string[],
    TRtn,
    TRemain extends string = TState["parse"],
    TTokens extends readonly unknown[] = TState["tokens"] extends readonly unknown[]
        ? TState["tokens"]
        : [],
> = Or<{
    [K in keyof TItems]: StartsWith<TRemain, TItems[K]>
}> extends true
    ? {
        parse: StripLeading<
            TRemain,
            Find<TItems, "startsWith", [ TRemain ]> extends string
                ? Find<TItems, "startsWith", [ TRemain ]>
                : never
        >;
        tokens: [...TTokens, TRtn];
    }
    : NoMatch;

/**
 * **createStaticTakeFunction**`(items[], cb) -> take(lex) -> Error | LexerState`
 *
 * a "builder" which _takes_:
 *
 * 1. a static set of variants to match on
 * 2. a _callback_ called when a match is found;
 *      - the callback is responsible for mapping the matched static token
 *      into a Lexer token or an Error
 *
 * ```ts
 * const fooBar = createStaticTakeFunction(
 *     [ "foo", "bar" ],
 *     (match, tokens) => {
 *         // ...
 *     }
 * ) -> (
 *   state: LexerState
 * ) -> LexerState | Error
 * ```
 */
export function createStaticTakeFunction<
    const TItems extends readonly string[],
    const TCb extends StaticTakeFunction__CallBack<
        TItems,
        Required<LexerState>
    >,
>(
    items: TItems,
    cb: TCb,
): TakeWrapper<
    Exclude<ReturnType<TCb>, Error | NoMatch>,
    TItems
> {
    return (state) => {
        const found = find("startsWith", state.parse)(items);

        if (found) {
            const rtn = cb({ found, state });
            return isError(rtn)
                ? rtn
                : isDeltaReturn(rtn)
                    ? {
                        parse: rtn[0],
                        tokens: [...(state.tokens), rtn[1]]
                    }
                    : Never;
        }

        // no match
        return NO_MATCH;
    };
}
