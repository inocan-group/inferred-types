
import { FalsyValue, Narrowable } from "src/types/index";
import { FALSY_VALUES } from "inferred-types";

/**
 * **isFalsy**()
 *
 * Creates a TypeGuard which checks whether a value is considered _falsy_ in
 * Javascript.
 */
export const isFalsy = <V extends Narrowable>(val: V): val is V & FalsyValue => {
  return FALSY_VALUES.includes(val as any);
};

