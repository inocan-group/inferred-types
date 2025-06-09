import type {
    Contains,
    Dictionary,
    Err,
    FromInputToken__String,
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
        RetainAfter<T, "WeakMap<">,
        ">"
    >
> = U extends [infer I extends string, ...(infer REST extends string[])]
    ? Contains<I, ","> extends true
        ? {
            inner: Trim<I>;
            rest: Trim<Join<REST>>;
        }
        : Err<
            `invalid-token/weakmap`,
            `A Map token did not provide a ',' seperator to delinate the key token from the value token!`,
            { token: I; rest: Join<REST> }
        >
    : Err<
        `invalid-token/weakmap`,
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
        FromInputToken__String<Success<Key<T>>>,
        {
            in: `WeakMap<${Success<Key<T>>},${Success<Value<T>>}>`;
            message: `Could not parse the Key token in WeakMap<${Success<Key<T>>},${Success<Value<T>>}>`;
        }
    >;

type Value<T extends string, S extends InnerRest | Error = Segment<T>> = IsWideString<T> extends true
    ? string | Error
    : S extends InnerRest
        ? NestedSplit<S["inner"], ",">[1] extends string
            ? NestedSplit<S["inner"], ",">[1]
            : Err<
                `invalid-token/weakmap`,
                `The Map token did not provide a ',' separator to delinate the key token from the value token!`,
                { key: S["inner"][0]; rest: Rest<T>; token: Trim<T> }
            >
        : S;

type ValueType<T extends string> = IsWideString<T> extends true
    ? unknown | Error
    : WhenErr<
        FromInputToken__String<Success<Value<T>>>,
        {
            in: `WeakMap<${Success<Key<T>>},${Success<Value<T>>}>`;
            message: `Could not parse the Value token of WeakMap<${Success<Key<T>>},${Success<Value<T>>}>`;
        }
    >;

type Parse<
    T extends string,
> = KeyType<T> extends Error
    ? KeyType<T>
    : ValueType<T> extends Error
        ? ValueType<T>
        : KeyType<T> extends Dictionary | Map<any, any> | Set<any>
            ? WeakMap<KeyType<T>, ValueType<T>> extends Error
                ? Err<
                    `invalid-token/weakmap`,
                    `The key and value tokens for a Map type were valid but used in the Map type these types are not allowed!`,
                    { key: Success<KeyType<T>>; value: Success<ValueType<T>>; token: Trim<T> }
                >
                : WeakMap<Success<KeyType<T>>, ValueType<T>>
            : Err<
                `invalid-token/weakmap`,
                `The key and value tokens of a WeakMap were parsed but the key is not a valid type for the key of a weakmap!`,
                { key: KeyType<T> }
            >;

/**
 * Look for a `WeakMap<...>` token at the start of a input token.
 *
 * - returns `Unset` if not found
 * - returns the Set's type -- with generics -- if there are no more tokens
 * after this token
 * - continues processing the rest of the string if there are more tokens
 * to be processed and adds an entry to the `TContainers` generic
 */
export type IT_TakeWeakMap<
    T extends string,
    TInner extends readonly unknown[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `WeakMap<${string}`
    ? Parse<T> extends Error
        ? Parse<T>
        : FromInputToken__String<
            Rest<T>,
            [...TInner, Success<Parse<T>>],
            TContainers
        >

    : Unset;

// DEBUG MAP
// type T = "WeakMap<string | number, Array<string>> | string";
// type TSegment = Segment<T>;
// type TKv = `WeakMap<${Key<T>}, ${Value<T>}>`;
// type TParse = Parse<T>
// type TRest = Rest<T>;
// type TTake = IT_TakeWeakMap<T>;
