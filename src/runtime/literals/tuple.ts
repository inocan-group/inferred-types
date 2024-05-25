import { First, If, IsUnion, Length, Narrowable, UnionToTuple } from "src/types/index";
import { asArray } from "src/runtime/index";

/**
 * **tuple**(value)
 * 
 * Creates a discrete tuple.
 * ```ts
 * // [1,2,3]
 * const t1 = tuple(1,2,3);
 * const t2 = tuple([1,2,3]);
 * ```
 */
export const tuple = <
  N extends Narrowable,
  K extends PropertyKey,
  T extends readonly (Record<K, N> | Narrowable)[]
>(...values: T) => {
  const arr = (
    values.length === 1
      ? values[0]
      : values
  ) as Length<T> extends 1
    ? T[0] extends readonly unknown[]
    ? T[0] extends infer Arr
    ? If<
      // eslint-disable-next-line no-use-before-define
      IsUnion<First<Arr & readonly unknown[]>>,
      UnionToTuple<First<T[0]>>,
      T[0]
    >
    : T[0]
    : T[0]
    : T;

  return asArray(arr);
};
