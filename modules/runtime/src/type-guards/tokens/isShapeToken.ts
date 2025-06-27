import type { AsOutputToken } from "inferred-types/types";
import {
    TT_ATOMICS,
    TT_CONTAINERS,
    TT_FUNCTIONS,
    TT_SETS,
    TT_SINGLETONS,
} from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const token_types = [
    ...TT_ATOMICS,
    ...TT_CONTAINERS,
    ...TT_FUNCTIONS,
    ...TT_SETS,
    ...TT_SINGLETONS,
] as const;

/**
 * **isShapeToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid "shape token" of some sort.
 */
export function isShapeToken(val: unknown): val is AsOutputToken {
    return isString(val)
        && val.startsWith("<<")
        && val.endsWith(">>")
        && token_types.some(t => val.startsWith(`<<${t}`));
}
