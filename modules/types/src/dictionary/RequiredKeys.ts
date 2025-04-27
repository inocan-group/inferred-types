import type {
    AfterFirst,
    AnyObject,
    As,
    Dictionary,
    EmptyObject,
    First,
    IfUnset,
    Keys,
    ObjectKey,
    Unset,
} from "inferred-types/types";

/**
 * **RequiredKeys**`<T,[V]>`
 *
 * Provides a union type of the _keys_ in `T` which are
 * **required** properties.
 *
 * **Note:** you also may optionally filter further by specifying a value
 * by the _value_ of the key and then only keys which are required AND
 * who extend `V` will be included in the union.
 *
 * **Related:** `OptionalKeys`, `RequiredProps`, `RequiredKeysTuple`
 */
export type RequiredKeys<
    T extends Dictionary,
    V = Unset,
> = As<{
    [K in keyof T]-?: EmptyObject extends { [P in K]: T[K] }
        ? never //
        : IfUnset<
            V,
            K,
            T[K] extends V
                ? K
                : never
        >;
}[keyof T], ObjectKey>;

type KeyList<
    TObj extends AnyObject,
    TKeys extends readonly (keyof TObj & ObjectKey)[],
    TResult extends ObjectKey[] = [],
> = [] extends TKeys
    ? TResult
    : undefined extends TObj[First<TKeys>]
        ? KeyList<TObj, AfterFirst<TKeys>, TResult>
        : KeyList<
            TObj,
            AfterFirst<TKeys>,
            [...TResult, First<TKeys>]
        >;

/**
 * **RequiredKeysTuple**`<T>`
 *
 * Provides a tuple of the _keys_ in `T` which are
 * **required** properties.
 *
 * **Related:** `OptionalKeys`, `RequiredProps`, `RequiredKeys`
 */
export type RequiredKeysTuple<
    T extends Dictionary,
> = As<Keys<T> extends readonly (ObjectKey & keyof T)[]
    ? KeyList<T, Keys<T>>
    : never,
    readonly ObjectKey[]
>;
