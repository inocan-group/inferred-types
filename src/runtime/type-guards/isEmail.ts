import { Email } from "src/types/index"
import { isString } from "src/runtime/index";

/**
 * **isEmail**`(val)`
 *
 * type guard which validates that the value passed in
 * in the correct shape to be an email address. It checks:
 *
 * 1. that leads with alphabetic char
 * 2. has a `@` character
 * 3. has at least one `.` char after the `@`
 */
export const isEmail = (val: unknown): val is Email => {
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
