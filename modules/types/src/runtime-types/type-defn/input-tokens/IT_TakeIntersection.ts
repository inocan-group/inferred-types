import type {
    As,
    Err,
    First,
    GetEach,
    GetInputToken,
    HasErrors,
    Increment,
    IsolatedResults,
    IsolateErrors,
    IT_TakeOutcome,
    IT_Token,
    Length,
    NestedSplit,
    TrimEach,
    TupleToIntersection
} from "inferred-types/types";

/**
 * **IT_TakeIntersection**`<TParse,TToken>`
 *
 * Takes the _prior token_ (which has already been parsed) and the
 * remaining parse string and converts it into an intersection type.
 */
export type IT_TakeIntersection<
    P extends string,
    T extends IT_Token | undefined
> = undefined extends T
? Err<
    `malformed-token/intersection`,
    `The intersection character '&' was found at the start of a parse string. This is invalid as the '&' operator must be inline with types on both sides!`,
    {
        parseString: P;
    }
>
: As<
    P extends `&${infer Rest extends string}`
        ? NestedSplit<Rest, "&"> extends infer Tokens extends readonly string[]
            ? TrimEach<Tokens> extends infer SplitTokens extends readonly string[]
                ? {
                    [K in keyof SplitTokens]: GetInputToken<SplitTokens[K]>
                } extends infer SplitTokens extends readonly unknown[]
                    ? HasErrors<SplitTokens> extends true
                        ? IsolateErrors<SplitTokens> extends infer Outcome extends IsolatedResults
                            ? Err<
                                `malformed-token/intersection`,
                                `Error occurred trying to parse the elements [${Increment<Length<SplitTokens>>}] of an intersection type. The text prior to the first '&' character was valid but ${Outcome["errors"]["length"]} of the remaining ${Length<SplitTokens>} were in an error state.`,
                                {
                                    token: P;
                                    splitTokens: TrimEach<Tokens>;
                                    firstError: First<Outcome["errors"]>;
                                    underlying: [T, ...SplitTokens];
                                }
                            >
                            : Err<"shit">
                        : {
                            __kind: "IT_Token";
                            kind: "intersection";
                            token: `${As<T, IT_Token>["token"]}&${Rest}`;
                            type: TupleToIntersection<[
                                As<T, IT_Token>["type"],
                                ...As<GetEach<SplitTokens, "type">, readonly unknown[]>
                            ]>;
                            members: [
                                As<T, IT_Token>["type"],
                                ...As<GetEach<SplitTokens, "type">, readonly unknown[]>
                            ];
                            rest: "";
                        }
                    : Err<
                        "malformed-token/intersection",
                        `An intersection type was detected and parsed into elements but at least one of these elements was unable to be parsed as an InputToken!`,
                        { tokens: SplitTokens }
                    >
                : Err<"malformed-token/intersection"
            : Err<
                `malformed-handler/intersection`,
                `The token string contained a '&' character indicating that this is an intersection type but `
            >
        : Err<"wrong-handler/intersection">,
    IT_TakeOutcome<"intersection">
>;
