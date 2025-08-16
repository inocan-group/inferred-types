import type {
    Dictionary,
    FromTo,
    IsLiteralLikeObject,
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
}>;

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
> = IsLiteralLikeObject<T> extends true
    ? ConvertFromTo<T> extends readonly FromTo[]
        ? ConvertFromTo<T>
        : never
    : FromTo[];
