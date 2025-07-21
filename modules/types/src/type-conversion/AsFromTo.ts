import type {
    Dictionary,
    FromTo,
    IsObjectLiteral,
    ObjectKey,
    ObjectKeys,
    Values,
} from "inferred-types/types";

/** converts an object's key values into FromTo tuple */
type ConvertFromTo<
    TObj extends Dictionary,
    TKey extends readonly ObjectKey[] = ObjectKeys<TObj>
> = Values<{
    [K in keyof TObj]: {
        from: K;
        to: TObj[K];
    }
}, true>;


/**
 * **AsFromTo**`<T>`
 *
 * Converts:
 * - an object KV is converted into a `FromTo[]` tuple
 *
 * **Notes:**
 * - any value which is already a FromTo will be kept as is
 * - any value which is _not_ a number will be converted to a `NumberLike` string and added
 * - any value which is neither a string or any of the above will be discarded
 */
export type AsFromTo<
    T extends Dictionary<string, string>,
> = IsObjectLiteral<T> extends true
    ? ConvertFromTo<T> extends readonly FromTo[]
        ? ConvertFromTo<T>
        : never
    : FromTo[];
