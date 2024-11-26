import {  SingletonToken } from "inferred-types/types";
import { isString } from "inferred-types/runtime"

import {
  TT_Atomics
} from "inferred-types/constants";

/**
 * **isSingletonToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `SingletonToken` of some sort.
 */
export const isSingletonToken = (val: unknown): val is SingletonToken => {
  return isString(val) &&
    TT_Atomics.some(v => val === `<<${v}>>`)
}
