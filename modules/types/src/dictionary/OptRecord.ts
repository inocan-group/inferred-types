import type { ObjectKey, MakeKeysOptional } from "inferred-types/types";

/**
 * **OptRecord**`<T,U>`
 *
 * Create a Record with the optional property set.
 */
export type OptRecord<
    T extends ObjectKey,
    U
> = MakeKeysOptional<Record<T, U>, [T]>;
