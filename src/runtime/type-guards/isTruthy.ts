import { Narrowable, FalsyValue } from "../../types";
import { FALSY_VALUES } from "../runtime";


/**
 * **isTruthy**
 * 
 * Creates a TypeGuard which checks whether a value is considered _truthy_
 * in Javascript.
 */
export const isTruthy = <V extends Narrowable>(val: V): val is Exclude<V, FalsyValue> => {
  return !FALSY_VALUES.includes(val as any);
};

