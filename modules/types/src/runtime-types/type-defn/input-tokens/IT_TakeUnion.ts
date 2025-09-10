import type {
    As,
    Err,
    FromInputToken__String,
    FromInputToken__Tuple,
    GetEach,
    GetInputToken,
    IT_TakeOutcome,
    IT_Token,
    Join,
    Last,
    NestedSplit,
    Trim,
    TrimEach,
    TupleToUnion
} from "inferred-types/types";

type HasEmptyString<T extends readonly string[]> = T extends [infer Head extends string, ...infer Rest extends readonly string[]]
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

type ParsePartTypes<
    T extends readonly string[]
> = As<{
    [K in keyof T]: FromInputToken__String<Trim<T[K]>>
}, readonly unknown[]>;

type Parse<
    TParts extends readonly string[]
> = As<
    ValidateStructure<TParts> extends Err<"malformed-token">
        ? ValidateStructure<TParts>
    : ValidateStructure<TParts> extends readonly string[]
        ? FromInputToken__Tuple<TParts> extends Err<"malformed-token">
            ? Err<
                "malformed-token/union",
                `Attempt to parse members of a union type failed because one or more were unable to be parsed into a valid type. ${FromInputToken__Tuple<TParts>["message"]}`,
                { parts: TParts }
            >
        : {
            __kind: "IT_Token";
            kind: "union";
            token: Trim<Join<ValidateStructure<TParts>, " | ">>;
            type: TupleToUnion<
                FromInputToken__Tuple<ValidateStructure<TParts>>
            >;
            rest: "";
            members:  FromInputToken__Tuple<ValidateStructure<TParts>>;
        }
    : Err<`malformed-token/union`>,
    IT_TakeOutcome<"union">
>;

/**
 * looks at the underlying tokens which will be part of the union; returns a `Err<"malformed-token">` if
 * an error is detected.
 *
 * - ensures no trailing empty string (which indicates | at end of string)
 * - ensure no interior members are empty strings (which indicates a duplicate '|' operator)
 *
 * If all passes then tokens are returned in a _trimmed_ form.
 */
type ValidateStructure<
    T extends readonly string[]
> =
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
        : TrimEach<T>;

/**
 * **IT_TakeUnion**`<TParse,TToken>`
 *
 * Takes a token (or undefined) and the remaining parse string.
 *
 * - if the remaining parse string starts with `|` then this utility will parse the remaining
 * string
 * - if the remaining parse string doesn't start with `|` then the Error "wrong-handler" is returned
 */
export type IT_TakeUnion<
    TParse extends string,
    TToken extends IT_Token | undefined
> = As<
    Trim<TParse> extends `|${infer Rest extends string}`
        ? TToken extends undefined
            ? Err<
                `malformed-token/union`,
                `The union operator '|' was found at the beginning of the parse string. This is not allowed as the union operator is an inline operator and must have types on both sides of it!`,
                { parseString: TToken,  previousToken: TToken }
            >
            : NestedSplit<Rest, "|"> extends infer Parts extends readonly string[]
                ? Parse<[`${As<TToken, IT_Token>["token"]}`, ...Parts]>
                : never
    : Err<"wrong-handler/union", `The union handler only takes parse strings which start with '|'`, { parse: TParse; token: TToken }>,
    IT_TakeOutcome<"union">
>;
