import type { Dictionary } from "../base-types/Dictionary";

/**
 * **AsContainer**`<T, [TError]>`
 *
 * Evaluates `T` and if it finds union type which includes a container
 * type then it narrows it to just the container types.
 *
 * - If `T` has no ability to be a container the type `TNever` is returned
 * (which defaults to the type of `never`)
 */
export type AsContainer<
    T,
    TError = never,
> = T extends readonly unknown[]
    ? T & readonly unknown[]
    : T extends Dictionary
        ? T & Dictionary
        : TError;
