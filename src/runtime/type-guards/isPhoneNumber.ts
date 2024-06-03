import { NUMERIC_CHAR } from "src/constants/NumericChar"
import { isString,asChars } from "src/runtime/index"

/**
 * **isPhoneNumber**`(val)`
 *
 * Type guard which validates that a string is in the shape of a phone
 * number.
 */
export const isPhoneNumber = <T>(val: T) => {
  return isString(val) &&
    ["+","(",...NUMERIC_CHAR].includes(asChars(val.trim())[0] as any) &&
    [...NUMERIC_CHAR].includes(
      [...asChars(val.trim())].pop() as any
    )

}
