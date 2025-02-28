/**
 * **uppercase**()
 *
 * Run time utility which ensures all letters are uppercase while preserving
 * string literal types.
 */
export function uppercase<T extends string>(str: T): Uppercase<T> {
    return str.toUpperCase() as Uppercase<T>;
}
