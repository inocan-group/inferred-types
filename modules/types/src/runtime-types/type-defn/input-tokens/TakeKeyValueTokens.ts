import { Err, FromInputToken__String, NestedSplit, ObjectKey, Trim } from "inferred-types/types";

type Parser<
    TContainer extends "Record" | "Map" | "WeakMap",
    TToken extends string
> = NestedSplit<TToken, ">"> extends [
    infer Block extends string,
    infer Rest extends string
]
    ? NestedSplit<Block, ","> extends [
        infer Key extends string,
        infer Value extends string
    ]
        ? FromInputToken__String<Key> extends infer KeyType
            ? TContainer extends "Record"
                ? KeyType extends ObjectKey
                    ? {
                        container: TContainer,
                        key: Trim<Key>,
                        value: Trim<Value>,
                        type: Record<KeyType, FromInputToken__String<Trim<Value>>>
                    }
                    : Err<
                        `invalid-token/record`,
                        `The key [${Key}] of Record must extends ObjectKey!`,
                        { key: Trim<Key>, value: Trim<Value>, keyType: KeyType, block: Block }
                    >
            : TContainer extends "Map"
                ? {
                    container: TContainer,
                    key: Key,
                    value: Value,
                    type: Map<KeyType, FromInputToken__String<Value>>
                }
            : TContainer extends "WeakMap"
                ? KeyType extends object
                    ? {
                        container: TContainer,
                        key: Key,
                        value: Value,
                        type: WeakMap<KeyType, FromInputToken__String<Value>>
                    }
                    : Err<
                        `invalid-token/weak-map`,
                        `The key [${Key}] for a WeakMap must be a `
                    >
            : never
            : never
        : Err<
            "not-kv/kv",
            `TakeKeyValueToken<T> can not find a ',' delimiter to separate key and value`,
            { container: TContainer, block: Block, rest: Rest }
        >
    : Err<
        `not-kv`,
        `TakeKeyValueToken<T> could not see the start of a key value type (Record,Map,WeakMap)`,
        { token: TToken }
    >
;

/**
 * **TakeKeyValueTokens**`<T>`
 *
 * Is intended for types like `Record<K,V>`, `Map<K,V>` and `WeakMap<K,V>`, it will
 * take the _key_ and _value_ types as well as capture the container type.
 */
export type TakeKeyValueTokens<T extends string> = T extends `Record<${infer Rest extends string}`
    ? Parser<"Record", Rest>
: T extends `Map<${infer Rest extends string}`
    ? Parser<"Map", Rest>
: T extends `WeakMap<${infer Rest extends string}`
    ? Parser<"WeakMap", Rest>
: Err<`not-kv`>;

type X = string | symbol extends ObjectKey ? true : false;
