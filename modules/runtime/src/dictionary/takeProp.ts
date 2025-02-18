import type { Narrowable, Something, TakeProp } from "inferred-types/types";
import { isArray, isObject } from "inferred-types/runtime";

/**
 * **takeProp**(val, prop, otherwise)
 *
 * Takes a property from a value if it is a _container_ and "prop"
 * is a valid index of the container. If not then it returns the
 * value provided in "otherwise".
 *
 * **Related:** `get`
 */
export function takeProp<
  T extends Something,
  P extends PropertyKey,
  E extends Narrowable = undefined,
>(val: T, prop: P, otherwise: E = undefined as E) {
  return (
    (isObject(val) || isArray(val)) && prop in val
      ? val[prop as unknown as keyof typeof val]
      : otherwise
  ) as unknown as TakeProp<T, P, E>;
}
