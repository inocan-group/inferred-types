import type {
    Contains,
    Err,
    FailFast,
    FromStringInputToken,
    IsWideString,
    Join,
    NestedSplit,
    RetainAfter,
    Success,
    Trim,
    Unset,
    WhenErr,
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

type InnerRest = { inner: string; rest: string };

type Segment<
    T extends string,
    U extends readonly string[] = NestedSplit<
        RetainAfter<T, "Map<">,
        ">"
    >
> = U extends [infer I extends string, ...(infer REST extends string[])]
    ? Contains<I, ","> extends true
        ? {
            inner: Trim<I>;
            rest: Trim<Join<REST>>;
        }
        : Err<
            `invalid-token/map`,
            `A Map token did not provide a ',' seperator to delinate the key token from the value token!`,
            { token: I; rest: Join<REST> }
        >
    : Err<
        `invalid-token/map`,
        "Problems segmenting Map token!",
        { token: Trim<T> }
    >;

type Rest<T extends string> = Segment<T> extends InnerRest
    ? Segment<T>["rest"]
    : "";

type Key<
    T extends string,
    S extends InnerRest | Error = Segment<T>
> = IsWideString<T> extends true
    ? string | Error
    : S extends InnerRest
        ? NestedSplit<S["inner"], ",">[0] extends string
            ? NestedSplit<S["inner"], ",">[0]
            : never
        : S extends Error
            ? S
            : never;

type KeyType<T extends string> = IsWideString<T> extends true
    ? unknown | Error
    : WhenErr<
        FromStringInputToken<Success<Key<T>>>,
        {
            in: `Map<${Success<Key<T>>},${Success<Value<T>>}>`;
            message: `Could not parse the Key token in Map<${Success<Key<T>>},${Success<Value<T>>}>`;
        }
    >;

type Value<T extends string, S extends InnerRest | Error = Segment<T>> = IsWideString<T> extends true
    ? string | Error
    : S extends InnerRest
        ? NestedSplit<S["inner"], ",">[1] extends string
            ? NestedSplit<S["inner"], ",">[1]
            : Err<
                `invalid-token/map`,
                `The Map token did not provide a ',' separator to delinate the key token from the value token!`,
                { key: S["inner"][0]; rest: Rest<T>; token: Trim<T> }
            >
        : S;

type ValueType<T extends string> = IsWideString<T> extends true
    ? unknown | Error
    : WhenErr<
        FromStringInputToken<Success<Value<T>>>,
        {
            in: `Map<${Success<Key<T>>},${Success<Value<T>>}>`;
            message: `Could not parse the Value token of Map<${Success<Key<T>>},${Success<Value<T>>}>`;
        }
    >;

type Parse<
    T extends string,
> = FailFast<[
    KeyType<T>,
    ValueType<T>,
    Map<Success<KeyType<T>>, Success<ValueType<T>>> extends Error
        ? Err<
            `invalid-token/map`,
            `The key and value tokens for a Map type were valid but used in the Map type these types are not allowed!`,
            { key: Success<KeyType<T>>; value: Success<ValueType<T>>; token: Trim<T> }
        >
        : Map<Success<KeyType<T>>, Success<ValueType<T>>>
]>;

/**
 * Look for a `Map<...>` token at the start of a input token.
 *
 * - returns `Unset` if not found
 * - returns the Set's type -- with generics -- if there are no more tokens
 * after this token
 * - continues processing the rest of the string if there are more tokens
 * to be processed and adds an entry to the `TContainers` generic
 */
export type IT_TakeMap<
    T extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `Map<${string}`
    ? Parse<T> extends Error
        ? Parse<T>
        : FromStringInputToken<
            Rest<T>,
            [...TInner, Success<Parse<T>>],
            TContainers
        >

    : Unset;

// DEBUG MAP
// type T = "Map<string | number, Array<string>> | string";
// type TSegment = Segment<T>;
// type TKv = `Map<${Key<T>}, ${Value<T>}>`;
// type TParse = Parse<T>
// type TRest = Rest<T>;
// type TTake = IT_TakeMap<T>;
