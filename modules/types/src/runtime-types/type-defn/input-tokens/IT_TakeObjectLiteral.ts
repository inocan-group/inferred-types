import type {
    As,
    EndsWith,
    Err,
    FromKv,
    GetEach,
    GetInputToken,
    IsolatedResults,
    IsolateErrors,
    IT_TakeOutcome,
    IT_Token,
    Join,
    KeyValue,
    Length,
    NestedSplit,
    Not,
    StripTrailing,
    Trim,
    TrimEach
} from "inferred-types/types";

type DetermineKeyType<
    T extends string
> = T extends "string"
    ? string
    : StripTrailing<T, "?"> extends "symbol"
        ? symbol
        : T extends string
            ? StripTrailing<T, "?">
            : Err<
                "malformed-token/object-literal",
                `A key '${T}' can not be converted to a type!`
            >;

type GetKv<
    TKey extends string,
    TValue extends string,
    TOptional extends boolean = EndsWith<TKey, "?">
> = [
    StripTrailing<TKey, "?">,
    Trim<TValue>
] extends [
    infer KeyToken extends string,
    infer ValueToken extends string
]
    ? DetermineKeyType<KeyToken> extends Error
        ? DetermineKeyType<KeyToken>
        : GetInputToken<ValueToken> extends Error
            ? Err<
                `malformed-token/object-literal`,
                `The value '${ValueToken}' in the key value pair '${TKey}: ${ValueToken}' could not be parsed into a type!`,
                { keyToken: KeyToken; valueToken: ValueToken; underlying: GetInputToken<ValueToken> }
            >
            : GetInputToken<ValueToken> extends IT_Token
                ? {
                    key: DetermineKeyType<KeyToken>;
                    value: GetInputToken<ValueToken>["type"];
                    required: Not<TOptional>;
                }
                : Err<`malformed-token/object-literal`>
    : never;

type ParseKv<
    T extends readonly string[]
> = IsolateErrors<{
    [K in keyof T]: NestedSplit<T[K], ":"> extends [
        infer KeyToken extends string,
        infer ValueToken extends string
    ]
        ? GetKv<Trim<KeyToken>, Trim<ValueToken>>
        : never
}>;

/**
 * **ParseObjectLiteral**`<T>`
 *
 * Tries to parse the head of the parse string for a string based object literal definition.
 *
 * - any parse string which _starts with_ `{${string}` will be assumed to be an attempt
 * to define an object literal
 */
type ParseObjectLiteral<T extends string> = NestedSplit<T, "}"> extends infer Parts extends readonly string[]
    ? Parts["length"] extends 1
        ? Err<
            "malformed-token/object-literal",
            `The terminating '}' character was not found in the token's object literal definition!`,
            { token: `{ ${T}` }
        >
        : Parts extends [
            infer Block extends string,
            ...infer Rest extends readonly string[]
        ]
            ? NestedSplit<Trim<Block>, [",", ";"]> extends infer KvPairs extends readonly string[]
                ? TrimEach<KvPairs> extends infer KVs extends readonly string[]
                    ? ParseKv<KVs> extends infer Outcome extends IsolatedResults
                        ? Length<Outcome["errors"]> extends 0
                            ? Outcome["successes"] extends infer Success extends readonly KeyValue[]
                                ? {
                                    __kind: "IT_Token";
                                    kind: "object-literal";
                                    token: `{ ${Trim<Block>} }`;
                                    type: FromKv<Success>;
                                    rest: Trim<Join<Rest, "}">>;
                                    keyValues: Success;
                                }
                                : Err<
                                    "malformed-token/object-literal",
                        `There were no errors detected in the key/value pairs but result type did not extends IT_Token: ${Block}`,
                        { block: Block; split: NestedSplit<Trim<Block>, [",", ";"]> }
                                >
                            : Err<
                                "malformed-token/object-literal",
                                `Error(s) occurred in parsing the key/value pairs of an object literal. The following errors were found: ${Join<GetEach<Outcome["errors"], "message">, "\n\t">}`,
                                { token: `{ ${Trim<Block>} }`; block: Trim<Block>; split: NestedSplit<Trim<Block>, [",", ";"]>; errors: GetEach<Outcome["errors"], "message"> }
                            >
                        : Err<
                            `malformed-token/object-literal`,
                            `Failed to parse the key values found in the object literal: '${T}'`,
                            { token: T; block: Block }
                        >
                    : Err<
                        "malformed-token/object-literal",
            `The parsing of an object literal was started due to the presence of the '{' character but no matching '}' was detected: ${Block}`
                    >
                : Err<
                    "malformed-token/object-literal",
                    `The terminating '}' character was not found in the token's object literal definition!`,
                    { token: T }
                >
            : Err<"oops">
    : never;

/**
 * **IT_TakeObjectLiteral**`<T>`
 *
 * Parses object literal definitions at the head of the parse string.
 *
 * - Strings starting with `{` indicate the beginning of an object literal definition
 */
export type IT_TakeObjectLiteral<T extends string> = As<
    T extends `{${infer Rest extends string}`
        ? ParseObjectLiteral<Trim<Rest>>
        : Err<
            `wrong-handler/object-literal"`,
        `The token ${T} did not start with '{' so this is not an object literal`
        >,
    IT_TakeOutcome<"object-literal">
>;
