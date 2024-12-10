import type { AtomicToken } from "inferred-types/types";
import { TT_Atomics } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

/**
 * **isAtomicToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `AtomicToken`.
 */
export function isAtomicToken(val: unknown): val is AtomicToken {
  return isString(val)
    && TT_Atomics.some(v => val === `<<${v}>>`);
}
