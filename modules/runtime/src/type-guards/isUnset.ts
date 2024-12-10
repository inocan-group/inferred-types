import type { Unset } from "inferred-types/types";
import { isObject } from "./isObject";

/**
 * **isUnset**`(val)`
 *
 * Type guard which validates that the value passed in `Unset`.
 *
 * **Related:** `isSet()`
 */
export function isUnset(val: unknown): val is Unset {
  return isObject(val) && val.kind === "Unset";
}

/**
 * **isSet**`(val)`
 *
 * Type guard which validates that the value passed in is **not** `Unset`.
 *
 * **Related:** `isUnset()`
 */
export function isSet<T>(val: T): val is Exclude<T, Unset> {
  return isObject(val)
    ? val.kind !== "Unset"
    : true;
}
