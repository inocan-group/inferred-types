import type { Err, FromInputToken__String, GetInputToken, IT_Token, NestedSplit, ObjectKey, Trim } from "inferred-types/types";

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
        ? GetInputToken<Key> extends infer KeyType extends IT_Token
            ? TContainer extends "Record"
                ? KeyType["type"] extends ObjectKey
                    ? {
                        __kind: "IT_Token";
                        kind: "kv";
                        token: `${Block}`;
                        type: Record<KeyType["type"], FromInputToken__String<Trim<Value>>>;
                        container: TContainer;
                        keyToken: Trim<Key>;
                        valueToken: Trim<Value>;
                        rest: Trim<Rest>;
                    }
                    : Err<
                        `malformed-token/record`,
                        `The key [${Key}] of Record must extends ObjectKey!`,
                        { key: Trim<Key>; value: Trim<Value>; keyType: KeyType; block: Block; rest: Trim<Rest> }
                    >
                : TContainer extends "Map"
                    ? {
                        __kind: "IT_Token";
                        kind: "kv";
                        token: `${Block}`;
                        type: Map<KeyType["type"], FromInputToken__String<Value>>;
                        container: TContainer;
                        keyToken: Trim<Key>;
                        valueToken: Trim<Value>;
                        rest: Trim<Rest>;
                    }
                    : TContainer extends "WeakMap"
                        ? KeyType extends object
                            ? {
                                __kind: "IT_Token";
                                kind: "kv";
                                token: `${Block}`;
                                type: WeakMap<KeyType["type"], FromInputToken__String<Value>>;
                                container: TContainer;
                                keyToken: Key;
                                valueToken: Value;
                                rest: Trim<Rest>;
                            }
                            : Err<
                                `malformed-token/weak-map`,
                        `The key [${Key}] for a WeakMap must be a container type!`
                            >
                        : never
            : never
        : Err<
            "wrong-handler/kv",
            `TakeKeyValueToken<T> can not find a ',' delimiter to separate key and value`,
            { container: TContainer; block: Block; rest: Trim<Rest> }
        >
    : Err<
        `wrong-handler`,
        `TakeKeyValueToken<T> could not see the start of a key value type (Record,Map,WeakMap)`,
        { token: TToken }
    >
;

/**
 * **IT_TakeKvObjects**`<T>`
 *
 * Is intended for types like `Record<K,V>`, `Map<K,V>` and `WeakMap<K,V>`, it will
 * take the _key_ and _value_ types as well as capture the container type.
 */
export type IT_TakeKvObjects<T extends string> = T extends `Record<${infer Rest extends string}`
    ? Parser<"Record", Rest>
    : T extends `Map<${infer Rest extends string}`
        ? Parser<"Map", Rest>
        : T extends `WeakMap<${infer Rest extends string}`
            ? Parser<"WeakMap", Rest>
            : Err<
                `wrong-handler/kv`,
    `The IT_TakeKvObjects can parse Record, Map, and WeakMap symbols but the tokens matched none of these signatures: ${T}`,
    { token: T }
            >;
