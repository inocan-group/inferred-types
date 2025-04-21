import type {
    As,
    Err,
    FailFast,
    FromStringInputToken,
    IsWideString,
    Join,
    NestedSplit,
    ObjectKey,
    RetainAfter,
    Success,
    Trim,
    Unset,
    WhenErr,
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type InnerRest = { inner: string; rest: string }

type Segment<
    T extends string,
    U extends readonly string[] = NestedSplit<RetainAfter<T, "Record<">,">">
> = U extends [infer I extends string, ...infer REST extends string[]]
? {
    inner: Trim<I>,
    rest: Trim<Join<REST>>
}
: Err<`invalid-token/record`, `Unable to parse Record Token: ${Trim<T>}`>;

type Rest<T extends string> = Segment<T> extends InnerRest
? Segment<T>["rest"]
: "";

type Key<
    T extends string,
    S extends InnerRest | Error = Segment<T>
> = IsWideString<T> extends true
? string | Error
: S extends InnerRest
    ? NestedSplit<S["inner"],",">[0] extends string
        ? NestedSplit<S["inner"],",">[0]
        : never
    : S extends Error
        ? S
        : never;

type KeyType<
    T extends string,
    K extends string = Success<Key<T>>,
    V extends string = As<Value<T>, string>
> = IsWideString<T> extends true
? unknown | Error
: WhenErr<
    FromStringInputToken<K>,
    {
        in: `Map<${K}, ${V}>`,
        message: `Could not parse the Key token in Map<${K}, ${V}>`
    }
>;

type ValidKey<
    T extends string,
    KT extends unknown = Success<KeyType<T>>,
    K extends string = Success<Key<T>>,
    V extends string = As<Value<T>, string>
> = IsWideString<T> extends true
? ObjectKey | Error
: KT extends ObjectKey
    ? KT
    : Err<
        `invalid-token/record`,
        `The Record<${K},${V}> had both key and value parsed into types but the key does not extend ObjectKey!`,
        { key: KT }

    >

;
type Value<
    T extends string,
    S extends InnerRest | Error = Segment<T>
> = IsWideString<T> extends true
? string | Error
: S extends InnerRest
? NestedSplit<S["inner"],",">[1] extends string
    ? NestedSplit<S["inner"],",">[1]
    : Err<
        `invalid-token/map`,
        `The Map token did not provide a ',' separator to delinate the key token from the value token!`,
        { key: S["inner"][0], rest: Rest<T>, token: Trim<T>}
    >
: S;

type ValueType<
    T extends string,
    K extends string = Success<Key<T>>,
    V extends string = As<Value<T>, string>
> = IsWideString<T> extends true
? unknown | Error
: WhenErr<
    FromStringInputToken<V>,
    {
        subType: "record",
        in: `Record<${K},${V}>`,
        message: `Could not parse the Value token of Map<${K},${V}>`
    }
>;

type Parse<
    T extends string
> = FailFast<[
    KeyType<T>,
    ValueType<T>,
    ValidKey<T>,
    Record<Success<ValidKey<T>>, Success<ValueType<T>>>
]>

export type IT_TakeRecord<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Record<${string}`
? Parse<T> extends Error
    ? Parse<T>
    : FromStringInputToken<
        Rest<T>,
        [ ...TInner, Parse<T> ],
        TContainers
    >
: Unset;


// DEBUG
// type T = "Record<string, string | number>"
// type TKey = Key<T>;
// type TValue = Value<T>;
// type TKeyType = KeyType<T>;
// type TValueType = ValueType<T>;
