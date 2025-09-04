import { As, EndsWith, Err, FromKv, GetInputToken, HasErrors, IsolateErrors, IT_TakeOutcome, IT_Token, Join, KeyValue, Length, NestedSplit, Not, StripTrailing, ToKv, Trim, TrimEach } from "inferred-types/types";

type KeyValueErrors<T extends readonly (KeyValue | Error)[]> = IsolateErrors<T>["errors"] extends infer E extends readonly (Error & { key: string; value: string })[]
    ? Join<{
        [K in keyof E]: `${E[K]["message"]}`
    }, "\n\t">
    : never;

type AsKeyValues<T extends readonly { key: IT_Token; value: IT_Token }[]> =  As<{
    [K in keyof T]: {
        key: T[K]["key"]["type"];
        value: T[K]["value"]["type"];
        required: true; // TODO need to adjust this to what was expressed
    }
}, readonly KeyValue[]>;

type DetermineKeyType<
    T extends string,
    U extends boolean = As<Not<EndsWith<T, "?">>, boolean>
> = T extends "string"
? { key: string; required: U }
: StripTrailing<T, "?"> extends "symbol"
? { key: symbol; required: U }
: T extends string
? { key: StripTrailing<T, "?">; required: U }
: Err<"invalid-type", `A key of an object literal provided the token '${T}' which can not be converted to a type!`>;

type ParseKv<
    T extends readonly string[]
> = {
    [K in keyof T]: NestedSplit<T[K], ":"> extends [
        infer Key extends string,
        infer Value extends string
    ]
        ? [
            DetermineKeyType<Trim<Key>>,
            GetInputToken<Trim<Value>>,
        ] extends [
            infer Key extends { key: string | symbol; required: boolean },
            infer Value extends IT_Token
        ]
            ? {
                key: Key["key"];
                value: Value["type"];
                required: Key["required"]
            }
        : Err<
            "invalid-kv-pair",
            `The KV pair '${Key}: ${Value}' was not parsable`,
            {
                key: Key;
                value: Value;
                error: ""
            }
        >
    : Err<`malformed-`>
};


/**
 * **ParseObjectLiteral**`<T>`
 *
 * Tries to parse the head of the parse string for a string based object literal definition.
 *
 * - any parse string which _starts with_ `{${string}` will be assumed to be an attempt
 * to define an object literal
 * - this utility is called once the leading `{` has been established so this utility will
 * either return successfully or return a `malformed-token` error.
 */
type ParseObjectLiteral<T extends string> = NestedSplit<T, "}"> extends [
    infer Block extends string,
    ...infer Rest extends readonly string[]
]
    ? NestedSplit<Block, [",", ";"]> extends infer KVs extends readonly string[]
        ? TrimEach<KVs> extends infer KVs extends readonly string[]
            ? ParseKv<KVs> extends infer KeyValues extends readonly KeyValue[]
                ? {
                    __kind: "IT_Token";
                    kind: "object-literal";
                    token: `{ ${Trim<Block>} }`;
                    type: FromKv<KeyValues>;
                    rest: Trim<Join<Rest, "}">>;
                    keyValues: KeyValues;
                }
                : Err<
                    "malformed-token/object-literal",
                    `The object literal could not be parsed:\n\t${KeyValueErrors<ParseKv<KVs>>}`,
                    { kvs: KVs; underlying: ParseKv<KVs> }
                >
            : Err<
                `malformed-token/object-literal`,
                `The token '{${T}' was unable to be parsed as an object literal [ '${Block}', '${Join<Rest,", ">}' ]`
            >
        : Err<
            "malformed-token/object-literal",
            `The parsing of an object literal was started due to the presence of the '{' character but no matching '}' was detected: ${Block}`
        >
    : Err<"malformed-token/object-literal", `The key value pairs inside the object literal definition were not able to be parsed: ${T}`>

;
/**
 * **IT_TakeObjectLiteral**`<T>`
 *
 * Parses object literal definitions at the head of the parse string.
 *
 * - Strings starting with `{` indicate the beginning of an object literal definition
 */
export type IT_TakeObjectLiteral<T extends string> = As<
    T extends `{${infer Rest extends string}`
    ? ParseObjectLiteral<Rest>
    : Err<`wrong-handler/object-literal"`>,
    IT_TakeOutcome<"object-literal">
>
