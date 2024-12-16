import type { TypeToken } from "inferred-types/types";
import { isTypeToken } from "inferred-types/runtime";

/**
 * **isUnionToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid **union** variant of a `TypeToken`.
 */
export function isUnionToken(val: unknown): val is TypeToken<"union"> {
  return isTypeToken(val, "union");
}
