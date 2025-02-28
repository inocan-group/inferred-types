import type { Dictionary } from "../base-types/Dictionary";

/**
 * **AsContainer**`<T, [TError]>`
 *
 * Returns `T` with the type that ensures it is a
 * container.
 */
export type AsContainer<
    T,
    TError = never,
> = T extends readonly unknown[]
    ? T & readonly unknown[]
    : T extends Dictionary
        ? T & Dictionary
        : TError;
