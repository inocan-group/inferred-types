import {  First,  Narrowable,  UnionToTuple, Unique } from "src/types/index";


/**
 * **unique**
 * 
 * Runtime utility which removes intersecting values from two sets and
 * provides a unique values contained in each set.
 */
export const unique = <
N extends Narrowable,
K extends number,
T extends readonly (Record<K,N> | Narrowable)[]
>(...values: T) => {
   
  const u: any[] = [];
  for (const i of values.flat()) {
    if(!u.includes(i)) {
      u.push(i);
    }
  }

  return u as First<T> extends readonly (Record<K,N> | Narrowable)[]
      ? Unique<UnionToTuple<First<T>>>
    : Unique<T>;
}
