/**
 * **lowercase**()
 *
 * Run time utility which ensures all letters are lowercase while preserving
 * string literal types.
 */
export function lowercase<T extends string>(str: T): Lowercase<T> {
    return str.toLowerCase() as Lowercase<T>;
}
