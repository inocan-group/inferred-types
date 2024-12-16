import type { TT_Set, TypeTokenSets } from "inferred-types/types";
import { getTokenKind, isString, isTypeToken } from "inferred-types/runtime";

/**
 * **isSetBasedToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `TypeToken` who's name "kind" ends in `-set`.
 */
export function isSetBasedToken(val: unknown): val is TT_Set {
  if (isTypeToken(val)) {
    const kind = getTokenKind(val);
    return kind.endsWith(`-set`);
  }

  return false;
}

export function isSetBasedKind(val: unknown): val is TypeTokenSets {
  return isString(val)
    && val.endsWith(`-set`);
}
