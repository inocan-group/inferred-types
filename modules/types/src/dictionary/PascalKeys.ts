
import type {
    AfterFirst,
    As,
    Contains,
    Dictionary,
    First,
    FromKv,
    Keys,
    KeyValue,
    ObjectKey,
    OptionalKeysTuple,
    PascalCase,
} from "inferred-types/types";

type Pascalize<
    T extends Dictionary,
    K extends readonly (ObjectKey & keyof T)[] = As<Keys<T>, readonly  (ObjectKey & keyof T)[]>,
    R extends readonly KeyValue[] = [],
    O extends readonly ObjectKey[] = OptionalKeysTuple<T>,
> = [] extends K
? As<R, readonly KeyValue[]>
: Pascalize<
    T,
    AfterFirst<K>,
    [
        ...R,
        Contains<O, First<K>> extends true
        ? KeyValue<
            // KEY
            First<K> extends string
                ? PascalCase<First<K>>
                : First<K>,
            // VALUE
            T[First<K>] extends Dictionary
                ? Pascalize<T[First<K>]>
                : T[First<K>],
            // REQUIRED
            false
        >

        : KeyValue<
            // KEY
            First<K> extends string ? PascalCase<First<K>> : First<K>,
            // VALUE
            T[First<K>] extends Dictionary
                ? Pascalize<T[First<K>]>
                : T[First<K>],
            true
        >
    ]
>

/**
 * **PascalKeys**`<T>`
 *
 * Converts an object's keys to the **PascalCase** equivalent
 * while keeping the values the same.
 */
export type PascalKeys<
    T extends Dictionary
> = FromKv<
    Pascalize<T>
>

