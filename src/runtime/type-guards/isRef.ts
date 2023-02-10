import { VueRef } from "src/types/literals/VueRef";
import { isObject } from "./isObject";

/**
 * **isRef**(value)
 * 
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T>(value: unknown): value is VueRef<T> {
  return isObject(value) && ("value" in (value as object) || ("__v_isRef" in (value as object)));
}
