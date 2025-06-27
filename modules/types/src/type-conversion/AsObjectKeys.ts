import type { ObjectKey } from "inferred-types/types";

/**
 * **AsObjectKeys**`<T>`
 *
 * Narrows type by validating that `T` extends a tuple of only
 * values which extend `ObjectKey`.
 */
export type AsObjectKeys<
    T extends readonly unknown[],
> = T extends readonly ObjectKey[]
    ? T
    : never;

/**
 * **AsObjectKey**`<T>`
 *
 * Narrows type by validating that `T` extends `ObjectKey`.
 */
export type AsObjectKey<T> = T extends ObjectKey ? T : never;
