import type { TypeToken } from "inferred-types/types";
import {
  endsWith,
  isString,
  startsWith,
} from "inferred-types/runtime";

/**
 * **isTypeToken**(val)
 *
 * Type guard which checks whether the given value is a valid `TypeToken`
 */
export function isTypeToken(val: unknown): val is TypeToken {
  if (isString(val) && startsWith("<<")(val) && endsWith(">>")(val)) {
    return true;
  }
  else {
    return false;
  }
}
