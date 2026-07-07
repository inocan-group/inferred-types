import type {
    AfterFirst,
    As,
    Dictionary,
    First,
    ObjectKey,
    ObjectKeys,
} from "inferred-types/types";

type Process<
    T extends Dictionary,
    K extends readonly ObjectKey[] = As<ObjectKeys<T>, readonly ObjectKey[]>,
    R extends readonly ObjectKey[] = []
> = [] extends K
    ? R
    : First<K> extends keyof T
        ? T[First<K>] extends Error
            ? Process<T, AfterFirst<K>, [...R, First<K>]>
            : Process<T, AfterFirst<K>, R>
        : never;

/**
 * **KeysWithError**`<T>`
 *
 * Returns all of the keys in a dictionary `T` which _extend_ `Error`.
 */
export type KeysWithError<
    T extends Dictionary
> = Process<T>;
