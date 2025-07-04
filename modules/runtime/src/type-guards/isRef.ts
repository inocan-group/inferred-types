import type { VueRef } from "inferred-types/types";
import { isDictionary } from "./isObject";

/**
 * **isRef**(value)
 *
 * Type guard which check whether the passed in value is a VueJS `Ref<T>` value.
 */
export function isRef<T>(value: T): value is T & VueRef<T> {
    return isDictionary(value)
        && ("value" in value)
        && Array.from(Object.keys(value)).includes("_value");
}
