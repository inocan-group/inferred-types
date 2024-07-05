import { SIMPLE_SCALAR_TOKENS, SIMPLE_TOKENS } from "src/constants/TypeTokens"
import { isArray } from "../isArray"
import { SimpleContainerToken, SimpleScalarToken, SimpleToken } from "src/types/runtime-types"
import { isString } from "../isString";

const split_tokens = SIMPLE_TOKENS.map(i => i.split("TOKEN"));
const scalar_split_tokens = SIMPLE_SCALAR_TOKENS.map(i => i.split("TOKEN"));
// const container_split_tokens = SIMPLE_CONTAINER_TOKENS.map(i => i.split("TOKEN"));


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
 * **isSimpleScalarToken**`(val)`
 *
 * Type guard which validates that what was passed in is a `SimpleScalarToken`
 *
 * **Related:** `isSimpleToken()`, `isSimpleContainerToken()`
 */
export const isSimpleScalarToken = (val: unknown): val is SimpleScalarToken => {
  return isString(val) && scalar_split_tokens.some(
    i => (
      (i.length === 1 && val === i[0]) ||
      (val.startsWith(i[0]) && val.endsWith(i.slice(-1)[0]) && i.every(p => val.includes(p)))
    )
  )
}

/**
 * **isSimpleContainerToken**`(val)`
 *
 * Type guard which validates that what was passed in is a
 * `SimpleContainerToken`.
 *
 * **Related:** `isSimpleToken()`, `isSimpleScalarToken()`
 */
export const isSimpleContainerToken = (val: unknown): val is SimpleContainerToken => {
  return isString(val) && scalar_split_tokens.some(
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
 * **Related:** `isSimpleToken()`, `isSimpleTokenTuple()`
 */
export const isSimpleTokenTuple = (val: unknown): val is SimpleToken[] => {
  return isArray(val) && val.length !== 0 &&
    val.every(isSimpleToken)
}

/**
 * **isSimpleScalarTokenTuple**`(val)`
 *
 * Type guard which validates that what was passed in a tuple of
 * `SimpleScalarToken`'s
 *
 * **Related:** `isSimpleToken()`, `isSimpleTokenTuple()`
 */
export const isSimpleScalarTokenTuple = (val: unknown): val is SimpleScalarToken[] => {
  return isArray(val) && val.length !== 0 &&
    val.every(isSimpleScalarToken)
}

/**
 * **isSimpleContainerTokenTuple**`(val)`
 *
 * Type guard which validates that what was passed in a tuple of
 * `SimpleContainerToken`'s
 *
 * **Related:** `isSimpleToken()`, `isSimpleTokenTuple()`
 */
export const isSimpleContainerTokenTuple = (val: unknown): val is SimpleContainerToken[] => {
  return isArray(val) && val.length !== 0 &&
    val.every(isSimpleContainerToken)
}
