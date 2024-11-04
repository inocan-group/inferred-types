import { BooleanLike } from "@inferred-types/types";
import { isBoolean } from "./isBoolean";
import { isString } from "./isString";

/**
 * **isBooleanLike**`(val)`
 *
 * A type guard which checks whether `val` is "boolean like; meaning either
 * a boolean value or a string representation of a boolean value.
 */
export const isBooleanLike = (val: unknown): val is BooleanLike => {
  return (
    isBoolean(val) || (
      isString(val) && ["true","false","boolean"].includes(val)
    )
  )
}
