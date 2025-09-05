import { As, Err, FromInputToken__String, GetEach, GetInputToken, IT_TakeOutcome, IT_Token, Join, Last, NestedSplit, Trim, TupleToUnion } from "inferred-types/types";

type HasEmptyString<T extends readonly string[]> = T extends [infer Head extends string, ...infer Rest extends readonly  string[]]
    ? Trim<Head> extends ""
        ? true
        : HasEmptyString<Rest>
: false;

type ParseParts<
    T extends readonly string[],
    R extends readonly IT_Token[] = []
> = As<
T extends [ infer Head extends string, ...infer Rest extends readonly string[] ]
    ? GetInputToken<Trim<Head>> extends Error
        ? GetInputToken<Trim<Head>>
    : GetInputToken<Trim<Head>> extends IT_Token
        ? ParseParts<
            Rest,
            [
                ...R,
                GetInputToken<Trim<Head>>
            ]
        >
    : Err<
        "malformed-token",
        `The token '${Head}' was unable to be parsed into a type!`,
        { result: FromInputToken__String<Trim<Head>> }
    >
: R,
readonly IT_Token[] | Error
>;


type Parse<
    TToken extends IT_Token,
    TParts extends (readonly string[]) | Error
> = As<
TParts extends Error
? TParts
: TParts extends readonly string[]
    ? Trim<Last<TParts>> extends ""
        ? Err<
            `malformed-token/union`,
            `The union operator '|' was found at the end of the parse string. This is not allowed as the union operator is an inline operator and must have types on both sides of it!`,
            { parseString: TToken }
        >
        : HasEmptyString<TParts> extends true
            ? Err<
                `malformed-token/union`,
                `The union operator '|' was found next to another '|' operator. This is not allowed as the union operator is an inline operator and must have types on both sides of it!`,
                { parseString: TToken }
            >
            : ParseParts<TParts> extends Error
                ? ParseParts<TParts> // exit with Error
                : ParseParts<TParts> extends readonly IT_Token[]
                    ? {
                        __kind: "IT_Token";
                        kind: "union";
                        token: Join<[
                            As<TToken, IT_Token>["token"],
                            ...As<GetEach<ParseParts<TParts>, "token">, readonly string[]>
                        ], " | ">;
                        type: TupleToUnion<[
                                TToken["type"],
                                ...As<GetEach<ParseParts<TParts>, "type">, readonly unknown[]>
                            ]>
                        rest: "";
                        members: [
                            As<TToken, IT_Token>["type"],
                            ...As<GetEach<ParseParts<TParts>, "type">, readonly unknown[]>
                        ]
                    }
        : Err<'empty'>
    : Err<'mystery'>,
    IT_Token<"union"> | Error
>;

type ValidateStructure<
    T extends readonly string[]
> = As<
Trim<Last<T>> extends ""
    ? Err<
        `malformed-token/union`,
        `The union operator '|' was found at the end of the parse string. This is not allowed as the union operator is an inline operator and must have types on both sides of it!`,
        { parseString: T }
    >
    : HasEmptyString<T> extends true
        ? Err<
            `malformed-token/union`,
            `The union operator '|' was found next to another '|' operator. This is not allowed as the union operator is an inline operator and must have types on both sides of it!`,
            { parseString: T }
        >
        : T,
    readonly string[] | Error
>;


/**
 * **IT_TakeUnion**`<TToken,TParse>`
 *
 * Takes a token (or undefined) and the remaining parse string.
 *
 * - if the remaining parse string starts with `|` then this utility will parse the remaining
 * string
 * - if the remaining parse string doesn't start with `|` then the Error "wrong-handler" is returned
 */
export type IT_TakeUnion<
    TToken extends IT_Token | undefined,
    TParse extends string
> = As<
TParse extends `|${infer Rest extends string}`
? TToken extends undefined
    ? Err<
        `malformed-token/union`,
        `The union operator '|' was found at the beginning of the parse string. This is not allowed as the union operator is an inline operator and must have types on both sides of it!`,
        { parseString: TToken }
    >
: NestedSplit<Rest, '|'> extends infer Parts extends readonly string[]
    ? Parse<As<TToken, IT_Token>, ValidateStructure<Parts>>
    : never
: Err<"wrong-handler/union", `The union handler only takes parse strings which start with '|'`>,
IT_TakeOutcome<"union">
>

