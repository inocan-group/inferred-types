import { WHITESPACE_CHARS } from "src/constants/Characters"
import { NUMERIC_CHAR } from "src/constants/NumericChar"
import { isString,asChars, retainChars, stripChars } from "src/runtime/index"
import { IsPhoneNumber } from "src/types/boolean-logic"

/**
 * **isPhoneNumber**`(val)`
 *
 * Type guard which validates that a string is in the shape of a phone
 * number.
 *
 * - Only valid characters (numeric, whitespace, `+`, `-`, `.`, and parenthesis)
 * - at least 7 numeric characters, 8 if `+` character used
 * - leading character (after whitespace) must be numeric, `(` or `+`
 *
 * **Related:** `asPhoneNumber()`, `PhoneNumber`
 */
export const isPhoneNumber = <T>(val: T): val is T => {
  return (
    isString(val) &&
    ["+","(",...NUMERIC_CHAR].includes(asChars(val.trim())[0] as any) &&
    [...NUMERIC_CHAR].includes(
      [...asChars(val.trim())].pop() as any
    ) &&
    (
      val.trim().startsWith(`+`)
      ? asChars(retainChars(val, ...NUMERIC_CHAR)).length >= 8
      : val.trim().startsWith("00")
        ? asChars(retainChars(val, ...NUMERIC_CHAR)).length >= 10
        : asChars(retainChars(val, ...NUMERIC_CHAR)).length >= 7
    ) &&
    stripChars(
      val,
      ...NUMERIC_CHAR,
      ...WHITESPACE_CHARS, "(", ")", "+", ".", "-"
    ) === ""
  ) as unknown as IsPhoneNumber<T>;
}
