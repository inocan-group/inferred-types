import { VueRef } from "src/types";
import { isObject } from "src/runtime";

/**
 * **isRef**(value)
 * 
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T>(value: T): value is T & VueRef {
  return isObject(value) && ("value" in value || ("__v_isRef" in value ));
}
