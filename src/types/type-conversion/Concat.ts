import { Tuple } from "../base-types";

/**
 * Concatenates two arrays (of literals).
 * ```ts
 * // [ "foo", "bar", "baz" ]
 * type T = ArrConcat<["foo"], ["bar", "baz"]>;
 * ```
 */
export type ArrConcat<A extends Tuple, B extends Tuple> = [...A, ...B];

