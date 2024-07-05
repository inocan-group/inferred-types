import { AtomicToken } from "src/types/index";
import { isString } from "../isString"

import {
  TT_Atomics
} from "src/constants/index";


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
