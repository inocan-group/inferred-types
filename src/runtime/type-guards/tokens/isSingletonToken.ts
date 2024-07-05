import {  SingletonToken } from "src/types/index";
import { isString } from "../isString"

import {
  TT_Atomics
} from "src/constants/index";

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
