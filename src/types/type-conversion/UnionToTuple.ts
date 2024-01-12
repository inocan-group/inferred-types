/* eslint-disable @typescript-eslint/no-unused-vars */

type UnionToIntersectionFn<T> = (
  T extends T ? (x: () => T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type GetUnionLast<T> = UnionToIntersectionFn<T> extends () => infer R
  ? R
  : never;
type Prepend<Arr extends unknown[], Item> = [Item, ...Arr];

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
export type UnionToTuple<T, Result extends unknown[] = [], Last = GetUnionLast<T>> = [
  T,
] extends [never]
  ? // return result
    Result extends readonly unknown[] ? Result : never
  : // remove last element of T and push it into Result
    UnionToTuple<Exclude<T, Last>, Prepend<Result, Last>> extends readonly unknown[]
      ? UnionToTuple<Exclude<T, Last>, Prepend<Result, Last>>
      : never;
