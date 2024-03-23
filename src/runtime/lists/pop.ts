import {  Narrowable, Slice, Tuple,  Last, IfNever } from "src/types/index";
import { last } from "./last";
import { slice } from "./slice";


export type PopResult<V, L extends Tuple> = [
  value: IfNever<V, undefined>, 
  list: L
];

/**
 * **pop**(list)
 * 
 * Takes a list of elements and then returns a `PopResult` unless
 * there were no more elements in which case the value _undefined_ is returned.
 * ```ts
 * // [3, [1,2]]
 * const [val, list] = pop([1,2,3]);
 * ```
 */
export const pop = <
N extends Narrowable,
K extends PropertyKey,
T extends readonly (Record<K,N> | Narrowable)[]
>(list: T) => {
  return (
    list.length > 0
    ? [last(list), slice(list, 0, -1)] as PopResult<Last<T>, Slice<T,0,-1>>
    : undefined
  ) as PopResult<Last<T>, Slice<T,0,-1>>;
};



