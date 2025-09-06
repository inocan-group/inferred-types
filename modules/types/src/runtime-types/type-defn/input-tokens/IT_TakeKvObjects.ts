import type {
    Err,
    FromInputToken__String,
    GetInputToken,
    IT_Token,
    Join,
    NestedSplit,
    Trim
} from "inferred-types/types";

type ParseRecord<T extends string> = NestedSplit<T, ">"> extends [
    infer Block extends string,
    ...infer Rest extends readonly string[]
]
    ? NestedSplit<Trim<Block>, ","> extends [
        infer Key extends string,
        infer Value extends string
    ]
        ? FromInputToken__String<Trim<Key>> extends Error
            ? Err<`malformed-token/record`, `while parsing a Record, the key token '${Trim<Key>}' was not parsable to a type!`>
            : FromInputToken__String<Trim<Value>> extends Error
                ? Err<`malformed-token/record`, `while parsing a Record, the value token '${Trim<Value>}' was not parsable to a type!`>
                : [
                    GetInputToken<Trim<Key>>,
                    GetInputToken<Trim<Value>>
                ] extends [
                    infer ParsedKey extends IT_Token,
                    infer ParsedValue extends IT_Token
                ]
                    ? ParsedKey["type"] extends string | symbol
                        ? {
                            __kind: "IT_Token";
                            kind: "kv";
                            token: `${Block}`;
                            type: Record<ParsedKey["type"], ParsedValue["type"]>;
                            container: "Record";
                            keyToken: Trim<Key>;
                            valueToken: Trim<Value>;
                            rest: Trim<Join<Rest, ">">>;
                        }
                        : Err<`malformed-token/record`, `The key and value tokens for the record 'Record<${Block}>' were parsed to types but the key's type did not extend string | symbol!`>
                    : never
        : Err<`malformed-token/record`, `The terminating '>' character was not found while parsing the record: 'Record<${T}>'`>
    : Err<"wrong-handler/record">;

type ParseMap<T extends string> = NestedSplit<T, ">"> extends [
    infer Block extends string,
    ...infer Rest extends readonly string[]
]
    ? NestedSplit<Trim<Block>, ","> extends [
        infer Key extends string,
        infer Value extends string
    ]
        ? FromInputToken__String<Trim<Key>> extends Error
            ? Err<`malformed-token/map`, `while parsing a Map, the key token '${Trim<Key>}' was not parsable to a type!`>
            : FromInputToken__String<Trim<Value>> extends Error
                ? Err<`malformed-token/map`, `while parsing a Map, the value token '${Trim<Value>}' was not parsable to a type!`>
                : {
                    __kind: "IT_Token";
                    kind: "kv";
                    token: `${Block}`;
                    type: Map<
                        FromInputToken__String<Trim<Key>>,
                        FromInputToken__String<Trim<Value>>
                    >;
                    container: "Map";
                    keyToken: Trim<Key>;
                    valueToken: Trim<Value>;
                    rest: Trim<Join<Rest, ">">>;
                }
        : Err<`malformed-token/map`, `The terminating '>' character was not found while parsing: 'Map<${T}'`>
    : Err<"wrong-handler/map">;

type ParseWeakMap<T extends string> = NestedSplit<T, ">"> extends [
    infer Block extends string,
    ...infer Rest extends readonly string[]
]
    ? NestedSplit<Trim<Block>, ","> extends [
        infer Key extends string,
        infer Value extends string
    ]
        ? FromInputToken__String<Trim<Key>> extends Error
            ? Err<`malformed-token/weakmap`, `while parsing a WeakMap, the key token '${Trim<Key>}' was not parsable to a type!`>
            : FromInputToken__String<Trim<Value>> extends Error
                ? Err<`malformed-token/weakmap`, `while parsing a WeakMap, the value token '${Trim<Value>}' was not parsable to a type!`>
                : [
                    GetInputToken<Trim<Key>>,
                    GetInputToken<Trim<Value>>
                ] extends [
                    infer ParsedKey extends IT_Token,
                    infer ParsedValue extends IT_Token
                ]
                    ? ParsedKey["type"] extends object
                        ? {
                            __kind: "IT_Token";
                            kind: "kv";
                            token: `${Block}`;
                            type: WeakMap<ParsedKey["type"], ParsedValue["type"]>;
                            container: "WeakMap";
                            keyToken: Trim<Key>;
                            valueToken: Trim<Value>;
                            rest: Trim<Join<Rest, ">">>;
                        }
                        : Err<`malformed-token/weakmap`, `The key and value tokens for 'WeakMap<${Block}>' were parsed to the key's type did not extend object (which is required for a WeakMap)!`>
                    : never
        : Err<`malformed-token/weakmap`, `The terminating '>' character was not found while parsing: 'WeakMap<${T}'`>
    : Err<"wrong-handler/weakmap">;

type Select<
    T extends readonly unknown[],
    TToken extends string,
    TVariants extends readonly unknown[] = T
> = T extends [infer Head, ...infer Rest extends readonly unknown[]]
    ? Head extends Err<"malformed-token">
        ? Head
        : Head extends Error
            ? Select<Rest, TToken, TVariants>
            : Head
    : Err<
        "wrong-handler/kv",
        `None of the variants of KV containers matched on: '${TToken}'`,
        { token: TToken; utility: "IT_TakeKvObject"; variants: TVariants }
    >;

/**
 * **IT_TakeKvObjects**`<T>`
 *
 * Is intended for types like `Record<K,V>`, `Map<K,V>` and `WeakMap<K,V>`, it will
 * take the _key_ and _value_ types as well as capture the container type.
 *
 * **Note:** the "object literal" type is taken separately from these more basic KV
 * forms. Use `IT_TakeObjectLiteral<T>` for taking object literals.
 */
export type IT_TakeKvObjects<T extends string> = Select<[
    T extends `Record<${infer Rest extends string}` ? ParseRecord<Rest> : Error,
    T extends `Map<${infer Rest extends string}` ? ParseMap<Rest> : Error,
    T extends `WeakMap<${infer Rest extends string}` ? ParseWeakMap<Rest> : Error
], T>;
