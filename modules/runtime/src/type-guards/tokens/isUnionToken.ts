import type { AtomicToken } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **isUnionToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `UnionToken`.
 */
export function isUnionToken(val: unknown): val is AtomicToken {
  return isString(val)
    && val.startsWith(`<<union::[`)
    && val.endsWith(`]>>`);
}
