
import { Narrowable, TakeProp, Something } from "inferred-types/dist/types/index";
import { isArray, isObject } from "src/runtime/index";

/**
 * **takeProp**(val, prop, otherwise)
 *
 * Takes a property from a value if it is a _container_ and "prop"
 * is a valid index of the container. If not then it returns the
 * value provided in "otherwise".
 *
 * **Related:** `get`
 */
export const takeProp = <
  T extends Something,
  P extends PropertyKey,
  E extends Narrowable
>(
  val: T,
  prop: P,
  otherwise: E
) => {
  return (
    (isObject(val) || isArray(val)) && prop in val
      ? val[prop as keyof typeof val]
      : otherwise
  ) as TakeProp<T, P, E>
}
