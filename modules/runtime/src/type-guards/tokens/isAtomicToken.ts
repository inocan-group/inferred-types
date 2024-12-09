import { TT_Atomics } from "inferred-types/constants";
import { AtomicToken } from "inferred-types/types";
import { isString } from "inferred-types/runtime";



/**
 * **isAtomicToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `AtomicToken`.
 */
export const isAtomicToken = (val: unknown): val is AtomicToken => {
  return isString(val) &&
    TT_Atomics.some(v => val === `<<${v}>>`)
}
