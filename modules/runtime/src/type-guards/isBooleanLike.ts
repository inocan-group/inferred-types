import type { BooleanLike } from "inferred-types/types";
import { isBoolean, isString } from "inferred-types/runtime";

/**
 * **isBooleanLike**`(val)`
 *
 * A type guard which checks whether `val` is "boolean like; meaning either
 * a boolean value or a string representation of a boolean value.
 */
export function isBooleanLike(val: unknown): val is BooleanLike {
  return (
    isBoolean(val) || (
      isString(val) && ["true", "false", "boolean"].includes(val)
    )
  );
}
