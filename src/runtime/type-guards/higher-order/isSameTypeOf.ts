import { ConvertTypeOf, GetTypeOf } from "inferred-types/dist/types/index";

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
export const isSameTypeOf = <TBase>(base: TBase) => <TCompare>(compare: TCompare): compare is TCompare & ConvertTypeOf<GetTypeOf<TBase>>  => {
      return typeof base === typeof compare;
};
