import type { LeftRight, Narrowable, Tuple } from "inferred-types/types";
import { isArray } from "inferred-types/runtime";

/**
 * **isLeftRight**(value)
 *
 * Type guard for detecting a `LeftRight` result.
 */
export function isLeftRight<T extends Narrowable | Tuple>(value: T): value is T & LeftRight<unknown, unknown> {
  return isArray(value) && (value as any).length === 3 && value[0] === "LeftRight";
}
