import { ConvertTypeOf, GetTypeOf } from "src/types";

/**
 * **isSameTypeOf**(base, compare)
 * 
 * A type guard which validates that `base` and `compare` of the same type defined by the runtime `typeof` operator 
 */
export const isSameTypeOf = //
<TBase>(base: TBase) => <TCompare>(compare: TCompare): compare is TCompare & ConvertTypeOf<GetTypeOf<TBase>>  => {
      return typeof base === typeof compare;
};
