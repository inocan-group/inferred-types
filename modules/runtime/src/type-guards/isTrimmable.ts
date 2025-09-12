import { isString } from "runtime/type-guards";

/**
 * **isTrimable**`(val)`
 *
 * tests whether a string has whitespace on either left or right edges.
 */
export function isTrimable<T>(val: T): val is T {
    return isString(val) && val !== val.trim();
}
