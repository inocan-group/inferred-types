import type { TakeState } from "inferred-types/types";
import { isArray, isObject } from "runtime/type-guards";

/**
 * **isTakeState**(val)
 *
 * Type guard which determines if the passed in `val` is a `TakeState`
 * object.
 */
export function isTakeState(val: unknown): val is TakeState {
    return isObject(val) && "kind" in val && val.kind === "TakeState" && "tokens" in val && isArray(val.tokens);
}
