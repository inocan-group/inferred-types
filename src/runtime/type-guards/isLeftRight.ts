import { LeftRight, Narrowable, Tuple } from "src/types/index";
import { isArray } from "src/runtime/index";


/**
 * **isLeftRight**(value)
 * 
 * Type guard for detecting a `LeftRight` result.
 */
export const isLeftRight = <T extends Narrowable | Tuple>(
  value: T
): value is T & LeftRight<unknown, unknown> => {

  return isArray(value) && (value as any).length === 3 && value[0] === "LeftRight";
};

