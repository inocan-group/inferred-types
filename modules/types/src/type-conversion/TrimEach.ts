import type { Trim } from "inferred-types/types";

/**
 * **TrimEach**`<T>`
 *
 * Trims each element of a Tuple/Array which extends _string_.
 *
 * - Non-string values are left as-is
 *
 * **Related:** `TrimDictionary`
 */
export type TrimEach<
    T extends readonly unknown[]
> = {
    [K in keyof T]: T[K] extends string
        ? Trim<T[K]>
        : T[K]
};
