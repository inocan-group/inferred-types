import type {
    AfterFirst,
    As,
    Dictionary,
    First,
    KeyValue,
    ObjectKey,
    ToKv,
} from "inferred-types/types";

type Process<
    T extends readonly KeyValue[],
    R extends readonly ObjectKey[] = []
> = [] extends T
    ? R
    : Process<
        AfterFirst<T>,
        First<T>["value"] extends Error
            ? [...R, First<T>["key"]]
            : R
    >;

/**
 * **KeysWithError**`<T>`
 *
 * Returns all of the keys in a dictionary `T` which _extend_ `Error`.
 */
export type KeysWithError<
    T extends Dictionary
> = As<Process<ToKv<T>>, readonly ObjectKey[]>;
