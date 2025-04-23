import type { AfterFirst, As, Dictionary, EmptyObject, Expand, First, Keys, ObjectKey, Trim } from "inferred-types/types";

export type _TrimDict<
    T extends Dictionary,
    K extends readonly (keyof T & ObjectKey)[],
    R extends Dictionary = EmptyObject
> = [] extends K
    ? Expand<R>
    : _TrimDict<
        T,
        AfterFirst<K>,
    R & Record<First<K>, T[First<K>] extends string ? Trim<T[First<K>]> : T[First<K>]>
    >;

/**
 * **TrimDictionary**`<T>`
 *
 * Trims all of the _values_ of a Dictionary which are strings. Non-string
 * values are proxied through unchanged.
 *
 * **Related:** `TrimEach`
 */
export type TrimDictionary<
    T extends Dictionary,
> = _TrimDict<T, As<Keys<T>, readonly (keyof T & ObjectKey)[]>>;
