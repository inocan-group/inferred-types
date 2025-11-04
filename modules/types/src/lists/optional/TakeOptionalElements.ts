import {
    HasOptionalElements,
    SliceArray,
    GetOptionalElementCount,
    Negative
} from "inferred-types/types";

/**
 * **TakeOptionalElements**`<T>`
 *
 * Returns only the **optional** elements in `T`.
 *
 * **Related:** `TakeOptionalElements`
 */
export type TakeOptionalElements<T extends readonly unknown[]> =
HasOptionalElements<T> extends true
? SliceArray<
    T,
    Negative<GetOptionalElementCount<T>> extends infer Offset extends number
        ? Offset
        : never
    >
: T;

