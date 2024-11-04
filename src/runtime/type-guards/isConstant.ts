
import { Constant  } from "inferred-types";
import { isObject  } from "src/runtime/index";

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

