import {  Narrowable, Slice, Tuple,  IfIndexable } from "../../types/base";

export type ShiftResult<V, L extends Tuple> = [value: V, list: L];

/**
 * **shift**(list)
 * 
 * Takes a list of elements and then returns a `ShiftResult` unless
 * there were no more elements in which case the value _undefined_ is returned.
 */
export const shift = <
N extends Narrowable,
K extends PropertyKey,
T extends readonly (Record<K,N> | Narrowable)[]
>(list: T) => {
  return (
    list.length > 0
    ? [list[0], list.slice(1)] as ShiftResult<T[0], Slice<T,1>>
    : undefined
  ) as IfIndexable<T, ShiftResult<T[0], Slice<T,1>>, undefined>;
};
