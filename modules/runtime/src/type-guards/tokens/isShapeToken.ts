import type { TypeToken } from "inferred-types/types";
import {
  TT_Atomics,
  TT_Containers,
  TT_Functions,
  TT_Sets,
  TT_Singletons,
} from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const token_types = [
  ...TT_Atomics,
  ...TT_Containers,
  ...TT_Functions,
  ...TT_Sets,
  ...TT_Singletons,
] as const;

/**
 * **isShapeToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid "shape token" of some sort.
 */
export function isShapeToken(val: unknown): val is TypeToken {
  return isString(val)
    && val.startsWith("<<")
    && val.endsWith(">>")
    && token_types.some(t => val.startsWith(`<<${t}`));
}
