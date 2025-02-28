import type { TT_Atomic, TypeTokenAtomics } from "inferred-types/types";
import { TT_ATOMICS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

/**
 * **isAtomicToken**`(val)`
 *
 * Type guard which validates whether the value passed in is a
 * valid `AtomicToken`.
 */
export function isAtomicToken(val: unknown): val is TT_Atomic {
    return isString(val)
        && TT_ATOMICS.some(i => val.startsWith(`<<${i}`));
}

export function isAtomicKind(val: unknown): val is TypeTokenAtomics {
    return isString(val)
        && TT_ATOMICS.includes(val as any);
}
