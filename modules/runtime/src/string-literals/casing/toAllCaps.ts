import { capitalize, ifLowercaseChar } from "inferred-types/runtime";

/**
 * **toAllCaps**`(str)`
 *
 * Converts a string to the "all caps" equivalent.
 *
 * **Related:** `toLowercase`, `capitalize`, `uncapitalize`
 */
export function toAllCaps<T extends string>(str: T): Uppercase<T> {
    return str
        .split("")
        .map(i => ifLowercaseChar(i, v => capitalize(v), v => v))
        .join("") as Uppercase<T>;
}
