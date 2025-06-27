import type { ConvertTypeOf, GetTypeOf } from "inferred-types/types";

/**
 * **isSameTypeOf**(base, compare)
 *
 * A type guard which validates that `base` and `compare` are the same "type"
 * defined by the runtime `typeof` operator.
 *
 * **Note:** if either `TBase` or `TCompare` are
 *
 * **Related:** `IsSameType`
 */
export function isSameTypeOf<TBase>(base: TBase) {
    return <TCompare>(compare: TCompare): compare is TCompare & ConvertTypeOf<GetTypeOf<TBase>> => {
        return typeof base === typeof compare;
    };
}
