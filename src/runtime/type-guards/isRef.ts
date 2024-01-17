import { VueRef } from "src/types/index";
import { isObject } from "src/runtime/index";

/**
 * **isRef**(value)
 * 
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T, S extends symbol>(value: unknown): value is VueRef<T,S> {
  
  return isObject(value) && ("value" in value) && Array.from(Object.keys(value)).includes("_value");
}
