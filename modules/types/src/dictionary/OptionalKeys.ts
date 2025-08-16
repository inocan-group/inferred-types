import type {
    As,
    Dictionary,
    EmptyObject,
    If,
    IsEqual,
    NotFilter,
    ObjectKey,
    UnionToTuple,
    Unset,
} from "inferred-types/types";

/**
 * **OptionalKeys**`<T,[V]>`
 *
 * Provides a union type of the _keys_ in `T` which are
 * **optional** properties.
 *
 * **Note:** you also may optionally filter further by specifying a value
 * by the _value_ of the key and then only keys which are required AND
 * who extend `V` will be included in the union.
 *
 * **Related:** `OptionalKeys`, `RequiredProps` * Provides a union type of the _keys_ in `T` which are
 * **required** properties.
 *
 * **Note:** you also may optionally filter further by specifying a value
 * by the _value_ of the key and then only keys which are required AND
 * who extend `V` will be included in the union.
 *
 * **Related:** `RequiredKeys`, `RequiredProps`
 */
export type OptionalKeys<
    T,
    V = Unset,
>
= T extends Dictionary

    ? {
        [K in keyof T]-?: EmptyObject extends { [P in K]: T[K] }
            ? If<IsEqual<V, Unset>, K, K extends V ? K : never>
            : never;
    }[keyof T]
    : never;

/**
 * **OptionalKeysTuple**`<T>`
 *
 * Provides a tuple of the _keys_ in `T` which are
 * **optional** properties.
 *
 * **Related:** `RequiredKeys`, `OptionalProps`
 */
export type OptionalKeysTuple<
    T,
> = T extends Dictionary
    ? As<
        NotFilter<UnionToTuple<OptionalKeys<T>>, "equals", [boolean]>,
        readonly ObjectKey[]
    >
    : never;
