import { ConvertTypeOf, GetTypeOf } from "src/types/index";

/**
 * **isSameTypeOf**(base, compare)
 * 
 * A type guard which validates that `base` and `compare` are the same "type" 
 * defined by the runtime `typeof` operator.
 * 
 * **Related:** `IsSameType`
 */
export const isSameTypeOf = //
<TBase>(base: TBase) => <TCompare>(compare: TCompare): compare is TCompare & ConvertTypeOf<GetTypeOf<TBase>>  => {
      return typeof base === typeof compare;
};
