/**
 * **capitalize**()
 *
 * Run time utility which _un_-capitalizes a word/string and preserves
 * string literal types.
 */
export function capitalize<T extends string>(str: T): Capitalize<T> {
    return `${str?.slice(0, 1).toUpperCase()}${str?.slice(1)}` as Capitalize<T>;
}
