import {
    As,
    Err,
    GetEach,
    IT_TakeOutcome,
    IT_Token,
    NestedSplit,
    TrimEach,
    TupleToIntersection,
    GetInputToken,
    HasErrors,
    Length,
    Increment
} from 'inferred-types/types';


/**
 * **IT_TakeIntersection**`<T,P>`
 *
 * Takes the _prior token_ (which has already been parsed) and the
 * remaining parse string and converts it into an intersection type.
 */
export type IT_TakeIntersection<
    T extends IT_Token | undefined,
    P extends string
> = As<
    P extends `&${infer Rest}`
    ? T extends undefined
        ? Err<
            `malformed-handler/intersection`,
            `The intersection character '&' was found at the start of a parse string. This is invalid as the '&' operator must be inline with types on both sides!`,
            {
                parseString: P;
            }
        >
        : NestedSplit<Rest, '&'> extends infer Tokens extends readonly string[]
            ? TrimEach<Tokens> extends infer Tokens extends readonly string[]
                ? {
                    [K in keyof Tokens]: GetInputToken<Tokens[K]>
                } extends infer Tokens extends readonly unknown[]
                    ? HasErrors<Tokens> extends true
                        ? Err<
                            `malformed-handler/intersection`,
                            `Error occurred trying to parse the elements [${Increment<Length<Tokens>>}] of an intersection type. The text prior to the first '&' character was valid but `,
                            {
                                token: P,
                                underlying:[T, ...Tokens]
                            }
                        >
                        : {
                            __kind: "IT_Token";
                            kind: "intersection";
                            token: `${As<T,IT_Token>["token"]}&${Rest}`;
                            type: TupleToIntersection<
                                As<GetEach<Tokens, "type">, readonly unknown[]>
                            >;
                            members: [
                                As<T,IT_Token>,
                                ...Tokens
                            ],
                            rest: ""
                        }
                    : Err<
                        "malformed-handler/intersection",
                        `An intersection type was detected and parsed into elements but at least one of these elements was unable to be parsed as an InputToken!`,
                        {tokens: Tokens}
                    >
                : never
            : Err<
                `malformed-handler/intersection`,
                `The token string contained a '&' character indicating that this is an intersection type but `
            >
    : Err<"wrong-handler/intersection">,
    // IT_TakeOutcome<"intersection">
    any
>
