import { ifLowercaseChar, lowercase } from "inferred-types/runtime";

/**
 * Converts a string to the "all lowercase" equivalent.
 *
 * **Related:** `toAllCaps`, `capitalize`, `uncapitalize`
 */
export function toLowercase<T extends string>(str: T): Lowercase<T> {
    return str
        .split("")
        .map(i => ifLowercaseChar(i, v => lowercase(v), v => v))
        .join("") as Lowercase<T>;
}
