/* eslint-disable @typescript-eslint/no-explicit-any */
import { FalsyValue, Narrowable } from "../../types/base";
import { FALSY_VALUES } from "src/constants";

/**
 * **isFalsy**()
 * 
 * Creates a TypeGuard which checks whether a value is considered _falsy_ in
 * Javascript.
 */
export const isFalsy = <V extends Narrowable>(val: V): val is V & FalsyValue => {
  return FALSY_VALUES.includes(val as any);
};

