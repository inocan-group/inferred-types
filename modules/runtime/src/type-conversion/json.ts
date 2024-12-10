import type { JsonValue, JsonValues } from "inferred-types/types";
import { isNumberLike } from "inferred-types/runtime";

/**
 * **jsonValue**`(val)`
 *
 * Converts a string value to JSON value
 *
 * **Related:** `jsonValues()`
 */
export function jsonValue<T>(val: T): JsonValue<T> {
  return (
    isNumberLike(val)
      ? Number(val)
      : val === "true"
        ? true
        : val === "false"
          ? false
          : `"${val}"`
  ) as unknown as JsonValue<T>;
}

/**
 * **jsonValues**`(values)`
 *
 * Converts string values to JSON values
 *
 * **Related:** `csv`
 */
export function jsonValues<T extends unknown[]>(...val: T): JsonValues<T> {
  return val.map(i => jsonValue(i)) as unknown[] as JsonValues<T>;
}
