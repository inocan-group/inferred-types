import type { TT_Function } from "inferred-types/types";
import { TT_FUNCTIONS, TT_START, TT_STOP } from "inferred-types/constants";
import { isString, isTypeTokenKind, stripSurround } from "inferred-types/runtime";

/**
 * type guard which validates that `val` is a _function based_ `TypeToken`
 */
export function isFnBasedToken(val: unknown) {
  if (isString(val) && val.startsWith(TT_START) && val.endsWith(TT_STOP)) {
    const stripped = stripSurround(TT_START, TT_STOP)(val);

    return TT_FUNCTIONS.some(i => stripped.startsWith(i));
  }
}

/**
 * type guard which validates that `val` is a `TypeTokenKind` which
 * represents a _function based_ token (excluding "-set" types)
 */
export function isFnBasedKind(val: unknown): val is TT_Function {
  if (isString(val) && isTypeTokenKind(val)) {
    const stripped = stripSurround(TT_START, TT_STOP)(val);

    return TT_FUNCTIONS.some(i => stripped.startsWith(i));
  }

  return false;
}
