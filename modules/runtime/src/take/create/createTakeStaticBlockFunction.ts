import {
    LexerState,
    Narrowable,
    StripLeading,
    Unset,
} from "inferred-types/types";

import {
    err,
    stripLeading,
    toStringLiteral__Tuple,
    unset
} from "inferred-types/runtime";


type StaticCallBack<TItems extends readonly string[]> = <
    T extends TItems[number]
>(item: T) => Narrowable;


type Returns<
    TRtn extends unknown,
    TItems extends readonly string[],
    TFound extends string,
    TState extends LexerState,
> = TState extends {
    remaining: infer Remain extends string;
    tokens: infer Tokens extends readonly Narrowable[]
}
? {
    remaining: StripLeading<Remain, TFound>,
    tokens: [...Tokens, TRtn]
}
: Unset;


/**
 * **createStaticTakeFunction**`(cb, ...items)`
 *
 * Builder which creates a take function which is interested
 * in an enumerated set of
 */
export function createStaticTakeFunction<
    const TCb extends StaticCallBack<TItems>,
    const TItems extends readonly string[]
>(
    cb: TCb,
    ...items: TItems
) {
    return <
        const TState extends LexerState<TParse, TTokens>,
        const TParse extends string,
        const TTokens extends (readonly Narrowable[] | [])
    >(
        state: TState
    ) => {
        try {
            const found = items.find(i => state.remaining.startsWith(i));
            if (found) {
                const rtn = cb(found);
                return {
                    remaining: stripLeading(state.remaining, found),
                    tokens: [...(state.tokens), rtn]
                } satisfies LexerState as unknown as Returns<
                    ReturnType<TCb>,
                    TItems,
                    typeof found,
                    TState
                >
            }

            return unset as Returns<
                ReturnType<TCb>,
                TItems,
                "",
                TState
            >;
        } catch (e) {
            return err(
                `parse/static`,
                `the take function provided by createStaticTakeFunction() hit an error: ${e instanceof Error ? e.message : String(e) }`,
                { cb, items: toStringLiteral__Tuple(items), remaining: state.remaining, tokens: state.tokens }
            )
        }

    }
}


const a = createStaticTakeFunction(
    (i): string => i === "Chris"
        ? "someone"
        : i === "Bob" ? "yur uncle" : "who knows",
    "Bob", "Chris", "Mary"
)


const b = a({remaining: "Bob is yur uncle", tokens: []});
