import type { Ref } from "vue";
import { isObject } from "./isObject";

/**
 * **isRef**(value)
 * 
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T>(value: unknown): value is Ref<T> {
  return isObject(value) && ("value" in (value as Object) || ("__v_isRef" in (value as Object)));
}
