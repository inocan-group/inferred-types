import type { Decrement, NumberLike } from "inferred-types/types";
import { asNumber, isString } from "inferred-types/runtime";

/**
 * **decrement**`(val)`
 *
 * Decrements a `NumberLike` value.
 */
export function decrement<T extends NumberLike>(val: T) {
    return isString(val)
        ? String(asNumber(val) - 1) as Decrement<T>
        : asNumber(val) - 1 as Decrement<T>;
}
