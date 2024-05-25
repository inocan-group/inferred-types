import { ifLowercaseChar, lowercase } from "src/runtime/index";

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
