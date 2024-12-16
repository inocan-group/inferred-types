import type { TT_Singleton, TypeTokenSingletons } from "inferred-types/types";
import {
  TT_SINGLETONS,
} from "inferred-types/constants";

import { isString } from "inferred-types/runtime";

/**
 * **isSingletonKind**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid Singleton token kind of some sort.
 */
export function isSingletonKind(val: unknown): val is TypeTokenSingletons {
  return isString(val)
    && TT_SINGLETONS.some(i => val.startsWith(`<<${i}`));
}

export function isSingletonToken(val: unknown): val is TT_Singleton {
  return isString(val)
    && TT_SINGLETONS.some(i => val.startsWith(`<<${i}`));
}
