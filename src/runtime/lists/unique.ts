import {  Unique } from "src/types";
import { get } from "../dictionary/get";
import { isString } from "../type-guards/isString";

/**
 * **unique**
 * 
 * Runtime utility which removes intersecting values from two sets and
 * provides a unique values contained in each set.
 */
export function unique<
  A extends readonly unknown[],  
  B extends readonly unknown[],
  TIndex extends string | number | null = null
>(a: A, b: B, index?: TIndex): Unique<A,B,TIndex> {
  const offset = index
    ? isString(index) ? index : String(index)
    : null;
  const bValues = offset === null
    ? b
    : b.map(i => get(i, offset));
  const aValues = offset === null
    ? a
    : a.map(i => get(i, offset));

  const forA = a.filter(i => !bValues.includes(get(i, offset)));
  const forB = b.filter(i => !aValues.includes(get(i, offset)));

  return [forA, forB] as unknown as Unique<A,B,TIndex>;
}
