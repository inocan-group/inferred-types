import { Email } from "src/types/type-conversion"
import { isString } from "src/runtime/index";

/**
 * **isEmail**`(val)`
 *
 * Tests to see if a string is shaped as an email address.
 */
export const isEmail = <T>(val: T): val is T & Email => {
  return isString(val) && (
    val.split("@").length === 2 &&
    val.split("@")[1].split(".").length > 1
  )
}
