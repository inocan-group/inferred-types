import { ifLowercaseChar } from "./ifLowercase";
import { lowercase } from "./lowercase";


/**
 * Converts a string to the "all lowercase" equivalent.
 * 
 * Note: non-alpha characters are left "as is"
 */
export function toLowercase<T extends string>(str: T): Lowercase<T> {
  return str
    .split("")
    .map(i => ifLowercaseChar(i, v => lowercase(v), v => v))
    .join("") as Lowercase<T>;
}
