import { LeftRight, Narrowable, Tuple } from "src/types";
import { isArray } from "./isArray";

/**
 * **isLeftRight**(value)
 * 
 * Type guard for detecting a `LeftRight` result.
 */
export const isLeftRight = <T extends Narrowable | Tuple>(
  value: T
): value is T & LeftRight<unknown,unknown> => {
  return isArray(value) && value.length === 3 && value[0] === "LeftRight";
};


