import { VueRef } from "src/types";
import { isObject } from "src/runtime";

/**
 * **isRef**(value)
 * 
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T>(value: T): value is T extends {value: unknown} ? VueRef<T["value"]> & T : never {
  return isObject(value) && ("value" in (value as object) || ("__v_isRef" in (value as object)));
}
