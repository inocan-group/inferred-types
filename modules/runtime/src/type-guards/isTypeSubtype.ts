import type { TypeSubtype } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * type guard which validates whether the `val` passed in is a valid `TypeSubtype`
 *
 * **Related:** `TypeSubtype`, `getTypeSubtype()`
 */
export function isTypeSubtype(val: unknown): val is TypeSubtype {
  return isString(val) && val.split("/").length === 2;
}
