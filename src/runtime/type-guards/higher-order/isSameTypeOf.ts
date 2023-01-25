import { ConvertTypeOf, GetTypeOf } from "types/runtime-types/TypeOf";

/**
 * **isSameTypeOf**(base, compare)
 * 
 * A type guard which 
 */
export const isSameTypeOf = //
<TBase>(base: TBase) => <TCompare>(compare: TCompare): compare is TCompare & ConvertTypeOf<GetTypeOf<TBase>>  => {
      return typeof base === typeof compare;
};
