import type {
    As,
    Err,
    FailFast,
    FromInputToken__String,
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
import { GetKeyType } from "types/runtime-types/type-defn/input-tokens/GetKeyType";

type InnerRest = { inner: string; rest: string };


type Segment<
    T extends string,
    U extends readonly string[] = NestedSplit<RetainAfter<T, "Record<">, ">"> extends readonly string[]
        ? NestedSplit<RetainAfter<T, "Record<">, ">">
        : never
> = U extends [infer I extends string, ...infer REST extends string[]]
    ? {
        inner: Trim<I>;
        rest: Trim<Join<REST>>;
    }
    : Err<`invalid-token/record`, `Unable to parse Record Token: ${Trim<T>}`>;

type Rest<T extends string> = Segment<T> extends InnerRest
    ? Segment<T>["rest"]
    : "";

type Key<
    T extends string,
    S extends InnerRest | Error = Segment<T>
> = string extends T
    ? string | Error
    : S extends InnerRest
        ? S["inner"] extends infer Inner extends string
            ? NestedSplit<Inner, ","> extends readonly [ infer Head extends string, ...unknown[]]
                ? Head
                : never
            : never
        : S extends Error
            ? S
            : never;

/**
 * used to lookup the type of key where
 */
type KeyType<
    T extends string,
    K extends string = Success<Key<T>>,
    V extends string = As<Value<T>, string>
> = string extends T
    ? unknown | Error
    : WhenErr<
        FromInputToken__String<K>,
        {
            in: `Map<${K}, ${V}>`;
            message: `Could not parse the Key token in Map<${K}, ${V}>`;
        }
    >;

type ValidKey<
    T extends string,
    KT = Success<KeyType<T>>,
    K extends string = Success<Key<T>>,
    V extends string = As<Value<T>, string>
> = string extends T
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
> = string extends T
    ? string | Error
    : S extends InnerRest
        ? S["inner"] extends infer Inner extends string
            ? NestedSplit<Inner, ","> extends readonly [ string , infer Val, ...unknown[]]
                ? Val
                : never
            : Err<
                `invalid-token/map`,
                `The Map token did not provide a ',' separator to delineate the key token from the value token!`,
                { key: S["inner"][0]; rest: Rest<T>; token: Trim<T> }
            >
        : S;

type ValueType<
    T extends string,
    K extends string = Success<Key<T>>,
    V extends string = As<Value<T>, string>
> = string extends T
    ? unknown | Error
    : WhenErr<
        FromInputToken__String<V>,
        {
            subType: "record";
            in: `Record<${K},${V}>`;
            message: `Could not parse the Value token of Map<${K},${V}>`;
        }
    >;

type Parse<
    T extends string
> = FailFast<[
    GetKeyType<T>,
    ValueType<T>,
    ValidKey<T>,
    Record<Success<ValidKey<T>>, Success<ValueType<T>>>
]>;

/**
 * used in parsing InputToken's into Record<X,Y> types.
 */
export type IT_TakeRecord<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Record<${string}`
    ? Parse<T> extends Error
        ? Parse<T>
        : FromInputToken__String<
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
