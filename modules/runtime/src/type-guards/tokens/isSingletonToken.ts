import type { SingletonToken } from "inferred-types/types";
import {
  TT_Atomics,
} from "inferred-types/constants";

import { isString } from "inferred-types/runtime";

/**
 * **isSingletonToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `SingletonToken` of some sort.
 */
export function isSingletonToken(val: unknown): val is SingletonToken {
  return isString(val)
    && TT_Atomics.some(v => val === `<<${v}>>`);
}
