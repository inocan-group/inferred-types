import { Chars } from "inferred-types/dist/types/index";

/**
 * **asChars**`(str)`
 *
 * Converts a string into an array of characters.
 */
export const asChars = <T extends string>(str: T): Chars<T> => {
  return str.split("") as Chars<T>;
}
