import type { TypeSubtype } from "inferred-types/types";
import { isString } from "./isString";

/**
 * type guard which validates whether the `val` passed in is a valid `TypeSubtype`
 *
 * **Related:** `TypeSubtype`, `getTypeSubtype()`
 */
export function isTypeSubtype(val: unknown): val is TypeSubtype {
  return isString(val) && val.split("/").length === 2;
}
