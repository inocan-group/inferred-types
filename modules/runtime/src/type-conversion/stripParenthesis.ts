import { stripLeading, stripTrailing } from "inferred-types/runtime"
import { StripSurround, Trim } from "inferred-types/types"


/**
 * **stripParenthesis**`(val)`
 *
 * A runtime utility which strips leading and trailing whitespace as well
 * as any leading or trailing parenthesis characters.
 */
export const stripParenthesis = <
  T extends string
>(val: T) => {
  return stripTrailing(stripLeading(val.trim(), "("), ")").trim() as unknown as Trim<StripSurround<Trim<T>, "("|")">>
}
