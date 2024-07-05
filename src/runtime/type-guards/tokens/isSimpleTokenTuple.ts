import { SIMPLE_TOKENS } from "src/constants/TypeTokens"
import { isArray } from "../isArray"
import { SimpleToken } from "src/types/runtime-types"
import { isString } from "../isString";

const split_tokens = SIMPLE_TOKENS.map(i => i.split("TOKEN"));


/**
 * **isSimpleToken**`(val)`
 *
 * Type guard which validates that what was passed in is a `SimpleToken`
 *
 * **Related:** `isSimpleTokenTuple`
 */
export const isSimpleToken = (val: unknown): val is SimpleToken => {

   return isString(val) && split_tokens.some(
    i => (
      (i.length === 1 && val === i[0]) ||
      (val.startsWith(i[0]) && val.endsWith(i.slice(-1)[0]) && i.every(p => val.includes(p)))
    )
  )
}

/**
 * **isSimpleTokenTuple**`(val)`
 *
 * Type guard which validates that what was passed in a tuple of `SimpleToken`'s
 *
 * **Related:** `isSimpleToken`
 */
export const isSimpleTokenTuple = (val: unknown): val is SimpleToken[] => {
  return isArray(val) && val.length !== 0 &&
    val.every(isSimpleToken)
}
