import {
    AsTakeState,
    StripLeading,
    TakeState,
    Err,
    As,
    StartsWith,
    InputToken,
    IsUnion,
    Slice,
    StringKeys,
    FnReturn,
    Dictionary,
    EmptyObject,
    FromInputToken,
    UpdateTake
} from "inferred-types/types";

type GetMatch<
    TMatch extends readonly string[],
    TContent extends string
> = TMatch extends [infer Head extends string, ...infer Rest extends readonly string[]]
? StartsWith<TContent, Head> extends true
    ? Head
    : GetMatch<Rest, TContent>
: null;

/**
 * **TakeStartCallback**
 *
 * A callback which receives the _matched value_ and the current state (as a `TakeState` object)
 * and must return an updated `TakeState` or
 */
export type TakeStartCallback = <
    TMatch extends string,
    TState extends TakeState
>(
    match: TMatch,
    state: TState
) => TakeState | Err<"skip"> | Err<"no-token"> | Err<"invalid-token">;

export type TakeStartMatches__Callback = readonly [TakeStartCallback, string, ...readonly string[]];
export type TakeStartMatches__Mapper = readonly [Dictionary<string>];
export type TakeStartMatches__Default = readonly [string, ...readonly string[]];

export type TakeStartMatchesKind = "callback" | "mapper" | "default";

export type TakeStartMatches<
    T extends TakeStartMatchesKind = TakeStartMatchesKind
> = IsUnion<T> extends true
? TakeStartMatches__Callback
| TakeStartMatches__Mapper
| TakeStartMatches__Default
: T extends "callback" ? TakeStartMatches__Callback
: T extends "mapper" ? TakeStartMatches__Mapper
: T extends "default" ? TakeStartMatches__Default
: never;

/**
 * get the list of string literals which we are trying to match on
 */
type GetMatches<T extends TakeStartMatches> = T extends TakeStartMatches<"callback">
? Slice<T,1>
: T extends TakeStartMatches<"mapper">
? StringKeys<T[0]>
: T extends TakeStartMatches<"default">
? T
: never;


/**
 * get's a lookup dictionary for when a "mapper" style is being used
 */
type GetLookup<
    T extends TakeStartMatches
> = T extends TakeStartMatches<"mapper">
? T[0]
: EmptyObject;

/**
 * get's a callback function
 */
type GetCallback<T extends TakeStartMatches> = T extends TakeStartMatches<"callback">
? T[0] extends infer Callback extends TakeStartCallback
    ? Callback
    : Err<
        "invalid-callback",
        `The callback provided to the takeStart() utility was invalid. It must extend the type TakeStartCallback!`,
        { callback: T[0] }
    >
: <S extends TakeState>(val: string, state: S) => S;


type GetToken<
    T extends string,
    M extends TakeStartMatches
> = GetMatches<M> extends infer Matches extends readonly string[]
    ? GetMatch<Matches, T> extends infer Match extends string
        ? M extends TakeStartMatches<"callback">
        ? FnReturn<GetCallback<M>> extends TakeState
            ? FnReturn<GetCallback<M>>["tokens"]
            : "shit"
        : M extends TakeStartMatches<"mapper">
            ? GetLookup<M> extends infer Lookup extends Dictionary
                ? Lookup[Match] extends [unknown, infer IT extends InputToken]
                    ? FromInputToken<IT> extends Error
                        ? Err<
                            "invalid-token",
                            `a takeStart() based function which used a token mapper had a problem with the key '${Match}'. When a user maps to a tuple, the second parameter is an InputToken but in this case the input token could not be parsed!`,
                            { mapper: Lookup }
                        >
                        : ["result",FromInputToken<IT>]
                : Lookup[Match]
            : never
        : M extends TakeStartMatches<"default">
            ? Match
        : Err<"invalid-token/bad-match-type">
    : Err<
        "no-match",
        `The variant type for the match types could not be matched to 'default', 'mapper', or 'callback'!`,
        { config: M; content: T; matches: Matches; }
    >
: Err<
    `invalid-config`,
    `The match configuration used in the takeStart() utility is not valid!`,
    { config: M }
>;

type Cb = <M extends string, S extends TakeState>(val: M, state: S) => UpdateTake<S,M>;
type T1 = GetMatches<[Cb, "foo", "bar"]>; // =>
type T2 = GetMatch<T1, "foobar">; // =>
type T3 = GetCallback<[Cb, "foo", "bar"]>; // =>
type RT3 = ReturnType<T3>; // =>
type T4 = GetToken<"foo", [Cb, "foo", "bar"]>; // =>

/**
 * **TakeStart**`<TMatch, TContent>`
 *
 * Attempts to find any of the string literals in `TMatch` at the head of the
 * parse string.
 */
export type TakeStart<
    TMatch extends TakeStartMatches,
    TContent extends string | TakeState
> = As<
    AsTakeState<TContent> extends infer State extends TakeState
        ? GetMatches<TMatch> extends infer Matches extends readonly string[]
            ? StartsWith<State["parseString"], Matches> extends true
                // Look for matches
                ? GetMatch<Matches, State["parseString"]> extends infer Match extends Matches[number]
                    ? GetToken<Match, TMatch> extends Error
                        ? GetToken<Match, TMatch> // exit with error
                    : {
                        kind: "TakeState";
                        parsed: [
                            ...State["parsed"],
                            Match
                        ];
                        parseString: StripLeading<State["parseString"], Match>;
                        tokens: [
                            ...State["tokens"],
                            GetToken<Match, TMatch>
                        ]
                    }
                // no matches
                : State // no change in state
            : never
        : never
    : never,
    TakeState | Error
>



