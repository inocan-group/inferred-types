
import { Constant  } from "inferred-types/constants";
import { isObject  } from "inferred-types/runtime";

/**
 * **isConstant**`(val)`
 *
 * Type guard which checks to see if it is of type
 * `Constant<T>`.
 */
export function isConstant<
  K extends string
>(value: unknown): value is Constant<K> {
  return isObject(value) &&
  "_type" in value &&
  "kind" in value &&
  value._type === "Constant"
   ? true : false;
}

