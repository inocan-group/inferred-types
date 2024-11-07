import { stripLeading, stripTrailing } from "inferred-types/dist/runtime/index"
import { StripSurround, Trim } from "inferred-types/dist/types/index"


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
