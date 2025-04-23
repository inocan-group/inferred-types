import type { If, IsUndefined, Mutable, Tuple } from "inferred-types/types";

type _AsArray<T> = T extends Tuple
    ? Mutable<T>
    : If<
        IsUndefined<T>,
        [],
        [T]
    >;

/**
 * **AsArray**`<T>`
 *
 * Type utility which ensures that `T` is an array by
 * encapsulating it as a single item array if it is a
 * non-array type.
 *
 * - if `T` is undefined then it is converted to an empty array `[]`
 */
export type AsArray<T> = _AsArray<T> extends any[]
    ? _AsArray<T>
    : never;
