import { Narrowable } from "src/types";
import { FalsyValue } from "types/boolean-logic/Truthy";
import { FALSY_VALUES } from "../runtime";

/**
 * **isFalsy**()
 * 
 * Creates a TypeGuard which checks whether a value is considered _falsy_ in
 * Javascript.
 */
export const isFalsy = <V extends Narrowable>(val: V): val is V & FalsyValue => {
  return FALSY_VALUES.includes(val as any);
};

