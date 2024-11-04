import { TT_Atomics } from "inferred-types";
import { AtomicToken } from "src/types/index";
import { isString } from "src/runtime/index";



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
