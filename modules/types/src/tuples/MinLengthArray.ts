import type { FixedLengthArray } from "./FixedLengthArray";

/**
 * **MinLengthArray**`<T,N>`
 *
 * Creates a fixed length `<N>` array of a given type `<T>` and then
 * allows additional items of `T` to be added beyond this minimum
 * required length.
 *
 * **Related:** `FixedLengthArray`
 */
export type MinLengthArray<
    T,
    L extends number,
> = [...FixedLengthArray<T, L>, ...T[]];
