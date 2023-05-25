import { VueRef } from "src/types";
import { isObject } from "src/runtime";

/**
 * **isRef**(value)
 * 
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T>(value: T): value is T & VueRef<T> {
  return isObject(value) && ("value" in value) && Object.keys(value).length === 2;
}
