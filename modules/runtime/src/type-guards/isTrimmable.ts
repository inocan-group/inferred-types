import { isString } from "./isString";

/**
 * **isTrimable**`(val)`
 *
 * tests whether a string has whitespace on either left or right edges.
 */
export function isTrimable<T>(val: T): val is T {
    return isString(val) && val !== val.trim();
}
