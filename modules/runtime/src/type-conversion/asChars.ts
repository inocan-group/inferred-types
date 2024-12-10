import type { Chars } from "inferred-types/types";

/**
 * **asChars**`(str)`
 *
 * Converts a string into an array of characters.
 */
export function asChars<T extends string>(str: T): Chars<T> {
  return str.split("") as Chars<T>;
}
