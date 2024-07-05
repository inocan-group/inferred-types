import { AtomicToken } from "src/types/index";
import { isString } from "../isString"



/**
 * **isUnionToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `UnionToken`.
 */
export const isUnionToken = (val: unknown): val is AtomicToken => {
  return isString(val) &&
    val.startsWith(`<<union::[`) &&
    val.endsWith(`]>>`)
}
