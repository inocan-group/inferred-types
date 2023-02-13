import { Unique } from "src/types";
import { isString } from "../type-guards/isString";
import { indexOf } from "./indexOf";

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
    : b.map(i => indexOf(i, offset));
  const aValues = offset === null
    ? a
    : a.map(i => indexOf(i, offset));

  const forA = a.filter(i => !bValues.includes(indexOf(i, offset)));
  const forB = b.filter(i => !aValues.includes(indexOf(i, offset)));

  return [forA, forB] as unknown as Unique<A,B,TIndex>;
}
