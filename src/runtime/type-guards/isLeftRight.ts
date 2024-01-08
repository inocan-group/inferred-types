import { LeftRight, Narrowable, Tuple } from "src/types";
import { isArray } from "src/runtime";

/**
 * **isLeftRight**(value)
 * 
 * Type guard for detecting a `LeftRight` result.
 */
export const isLeftRight = <T extends Narrowable | Tuple>(
  value: T
): value is T & LeftRight<unknown,unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isArray(value) && (value as any).length === 3 && value[0] === "LeftRight";
};


