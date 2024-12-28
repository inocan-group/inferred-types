import type { Csv } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **isCsv**`(val)`
 *
 * type guard which validates that `val` is a CSV based
 * string.
 */
export function isCsv(val: unknown): val is Csv {
  return isString(val) && val.includes(",") && !val.startsWith(",");
}
