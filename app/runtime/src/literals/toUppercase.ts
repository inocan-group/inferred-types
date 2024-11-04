import { capitalize, ifLowercaseChar } from "@inferred-types/runtime";

/**
 * Converts a string to the "all caps" equivalent.
 *
 * Note: non-alpha characters are left "as is"
 */
export function toUppercase<T extends string>(str: T): Uppercase<T> {
  return str
    .split("")
    .map(i => ifLowercaseChar(i, v => capitalize(v), v => v))
    .join("") as Uppercase<T>;
}
