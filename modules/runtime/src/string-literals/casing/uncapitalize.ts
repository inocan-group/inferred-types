/**
 * **uncapitalize**()
 *
 * Run time utility which _un_-capitalizes a word/string and preserves
 * string literal types.
 */
export function uncapitalize<T extends string>(str: T): Uncapitalize<T> {
    return `${str?.slice(0, 1).toLowerCase()}${str?.slice(1)}` as Uncapitalize<T>;
}
