import { Email } from "src/types/index"
import { isString } from "src/runtime/index";

/**
 * **isEmail**`(val)`
 *
 * Tests to see if a string is shaped as an email address.
 */
export const isEmail = <T>(val: T): val is T & Email => {
  if (!isString(val)) {
    return false
  }
  const parts: string[] = val.split("@");
  const domain = parts[1].split(".");
  const tld = domain.pop() as string;

  return isString(val) && (
    parts.length === 2 &&
    domain.length >= 1 &&
    tld.length >= 2
  )
}
