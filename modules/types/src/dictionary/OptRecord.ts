import { ObjectKey } from "types/base-types"
import { MakeKeysOptional } from "types/dictionary/MakeKeysOptional"


/**
 * **OptRecord**`<T,U>`
 *
 * Create a Record with the optional property set.
 */
export type OptRecord<
    T extends ObjectKey,
    U
> = MakeKeysOptional<Record<T,U>,[T]>
