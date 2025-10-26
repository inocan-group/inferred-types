import type { Fallback, Narrowable } from "inferred-types/types";
import { isUndefined } from "inferred-types/runtime";
import { isNull } from "runtime/type-guards";

/**
 * **fallback**`(val, fallback)`
 *
 * Provides a fallback value to `val` if `val` is either `null` or
 * `undefined`.
 */
export function fallback<
    const TVal extends Narrowable,
    const TFallback extends Narrowable
>(val: TVal, fallback: TFallback): Fallback<TVal, TFallback> {
    return (
        isNull(val) || isUndefined(val)
            ? fallback
            : val
    ) as Fallback<TVal, TFallback>;
}
