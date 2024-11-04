import {  SingletonToken } from "@inferred-types/types";
import { isString } from "src/runtime/index"

import {
  TT_Atomics
} from "inferred-types";

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
