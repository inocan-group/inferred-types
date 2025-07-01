import {
    Find,
    LexerState,
    Or,
    Unset,
    StartsWith, StripLeading
} from "inferred-types/types";

import {
    compare,
    find,
    startsWith,
    stripLeading,
    unset
} from "inferred-types/runtime";


export type StaticTakeFunction__CallBack<
    TItems extends readonly string[],
    TState extends Required<LexerState<TParse, TTokens>>,
    TParse extends string = string,
    TTokens extends readonly unknown[] = readonly unknown[]
> = <
    T extends TItems[number]
>(payload: {
    /** the static token found at the HEAD of the parse string */
    found: T,
    /** the parse string and tokens (updated with latest token) */
    state: TState
}) => unknown;


export type StaticTakeFunction__Rtn<
    TState extends LexerState,
    TItems extends readonly string[],
    TRtn,
    TRemain extends string = TState["parse"],
    TTokens extends readonly unknown[] =
        TState["tokens"] extends readonly unknown[]
            ? TState["tokens"]
            : [],
> = Or<{
    [K in keyof TItems]: StartsWith<TRemain, TItems[K]>
}> extends true
    ? {
        parse: StripLeading<
            TRemain,
            Find<TItems, "startsWith",[ TRemain ]> extends string
                ? Find<TItems, "startsWith", [ TRemain ]>
                : never
        >,
        tokens: [...TTokens, TRtn]
    }
    : Unset;


/**
 * **createStaticTakeFunction**`(cb, ...items)`
 *
 * Builder which creates a take function which is interested
 * in an enumerated set of
 */
export function createStaticTakeFunction<
    const TCb extends StaticTakeFunction__CallBack<
        TItems,
        Required<LexerState>
    >,
    TItems extends readonly string[]
>(
    items: TItems,
    cb: TCb,
) {
    return <
        const TState extends Required<LexerState<TParse,TTokens>>,
        const TParse extends string,
        const TTokens extends readonly unknown[]
    >(
        state: TState
    ) => {
            const found = find("startsWith", state.parse)(items);

            if (found) {
                const rtn = cb({ found, state });
                return {
                    parse: stripLeading(state.parse, found),
                    tokens: [...(state.tokens || []), rtn]
                } satisfies LexerState as StaticTakeFunction__Rtn<
                    TState,
                    TItems,
                    ReturnType<TCb>
                >
            }

            return unset as StaticTakeFunction__Rtn<
                TState,
                TItems,
                ReturnType<TCb>
            >;
    }
}


