/**
 * **IsArray**
 *
 * Boolean utility which tests for whether `T` is an array (
 * both a mutable array or a readonly array)
 */
export type IsArray<T> = [T] extends [any[]]
    ? true
    : [T] extends [readonly any[]]
        ? true
        : false;
