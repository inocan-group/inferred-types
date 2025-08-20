import type { DefineTuple } from "inferred-types/types";
import { isArray, isInputToken } from "inferred-types/runtime";

/**
 * **isDefineTuple**`(val)`
 *
 * A type guard which validates that `val` is a _tuple_ of `DefineTuple`.
 *
 * - `DefineTuple` is just a tuple of `InputToken` elements
 */
export function isDefineTuple(
    val: unknown
): val is DefineTuple {
    return isArray(val) && val.every(
        i => isInputToken(i)
    );
}
