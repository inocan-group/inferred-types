import type {
    Dictionary,
    FromTo,
    IsWideContainer,
    Values,
} from "inferred-types/types";

/** converts an object's key values into FromTo tuple */
type ConvertFromTo<
    TObj extends Dictionary,
> = Values<{
    [K in keyof TObj]: {
        from: K;
        to: TObj[K];
    }
}, true>;

/** converts an object's key values into FromTo tuple (in reverse) */
type ConvertToFrom<
    TObj extends Dictionary,
> = Values<{
    [K in keyof TObj]: {
        to: K;
        from: TObj[K];
    }
}, true>;

/**
 * **AsFromTo**`<T>`
 *
 * Converts:
 * - an object-based lookup into a `FromTo[]` tuple
 *
 * **Notes:**
 * - any value which is already a FromTo will be kept as is
 * - any value which is _not_ a number will be converted to a `NumberLike` string and added
 * - any value which is neither a string or any of the above will be discarded
 */
export type AsFromTo<
    T extends Dictionary<string, string>,
> = IsWideContainer<T> extends true
    ? FromTo[]
    : ConvertFromTo<T> extends readonly FromTo[]
        ? ConvertFromTo<T>
        : never;

/**
 * **AsToFrom**`<T>`
 *
 * Converts:
 *
 *    - an object-based KV lookup into a `FromTo[]` tuple
 * _in reverse_.
 *
 * **Related:** `AsFromTo`
 */
export type AsToFrom<
    T extends Dictionary<string, string>,
> = IsWideContainer<T> extends true
    ? FromTo[]
    : ConvertToFrom<T> extends readonly FromTo[]
        ? ConvertToFrom<T>
        : never;
