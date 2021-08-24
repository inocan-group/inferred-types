/* eslint-disable @typescript-eslint/no-unused-vars */
// https://github.com/type-challenges/type-challenges/issues/737

import { UnionToIntersection } from "./UnionToIntersection";

/**
 * LastInUnion<1 | 2> = 2.
 */
export type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never;

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];
