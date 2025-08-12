import type { Chars } from "inferred-types/types";

/**
 * **asChars**`(str)`
 *
 * Converts a string into an array of characters and preserves literal type
 * where possible.
 *
 *
 * ```ts
 * // [ "h", "e", "l", "l", "o" ]
 * const chars = asChars("hello");
 * ```
 */
export function asChars<T extends string>(str: T): Chars<T> {
    return str.split("") as Chars<T> & string[];
}
