import type { ObjectKey } from "types/base-types";
import type { MakeKeysOptional } from "types/dictionary/MakeKeysOptional";

/**
 * **OptRecord**`<T,U>`
 *
 * Create a Record with the optional property set.
 */
export type OptRecord<
    T extends ObjectKey,
    U
> = MakeKeysOptional<Record<T, U>, [T]>;
