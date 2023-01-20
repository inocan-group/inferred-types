/**
 * Concatenates two arrays (of literals).
 * ```ts
 * // [ "foo", "bar", "baz" ]
 * type T = ArrConcat<["foo"], ["bar", "baz"]>;
 * ```
 */
export type ArrConcat<A extends any[], B extends any[]> = [...A, ...B];

