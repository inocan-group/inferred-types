 
import { FalsyValue } from "src/types/index";
import { FALSY_VALUES } from "src/constants/index";


/**
 * **isTruthy**
 * 
 * Creates a TypeGuard which checks whether a value is considered _truthy_
 * in Javascript.
 */
export const isTruthy = <V>(val: V): val is Exclude<V, FalsyValue> => {
  return !FALSY_VALUES.includes(val as any);
};

