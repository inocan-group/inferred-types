import { AsTakeState, StripLeading, TakeState, Err, As, StartsWith, InputToken } from "inferred-types/types";

type GetMatch<
    TMatch extends readonly string[],
    TContent extends string
> = TMatch extends [infer Head extends string, ...infer Rest extends readonly string[]]
? StartsWith<TContent, Head> extends true
    ? Head
    : GetMatch<Rest, TContent>
: null;


export type TakeStartCallback = <V extends string, S extends TakeState>(
    value: V,
    state: S
) => TakeState | Err<"skip"> | Err<"no-token"> | Err<"invalid-token">;

export type TakeStartMatches =
| readonly [string, ...readonly string[]]
| readonly [TakeStartCallback, string, ...readonly string[]]
| Record<string, string | [string, InputToken]>;

/**
 * **TakeStart**`<TMatch, TContent>`
 *
 * Attempts to find any of the string literals in `TMatch` at the head of the
 * parse string.
 */
export type TakeStart<
    TMatch extends readonly string[],
    TContent extends string | TakeState
> = As<
    AsTakeState<TContent> extends infer State extends TakeState
    ? StartsWith<State["parseString"], TMatch> extends true
        ? GetMatch<TMatch, State["parseString"]> extends infer Start extends TMatch[number]
            ? {
                kind: "TakeState";
                parsed: [
                    ...State["parsed"],
                    Start
                ];
                parseString: StripLeading<State["parseString"], Start>;
                tokens: [
                    ...State["tokens"],
                    Start
                ]
            }
            : State
        : never
    : never,
    TakeState
>;
