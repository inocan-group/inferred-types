import { Container, Tuple, Unique } from "../../types/base";
import { isString, indexOf } from "src/runtime";

/**
 * **unique**
 * 
 * Runtime utility which removes intersecting values from two sets and
 * provides a unique values contained in each set.
 */
export function unique<
  A extends Tuple,  
  B extends Tuple,
  TIndex extends string | number | null = null
>(a: A, b: B, index?: TIndex): Unique<A,B,TIndex> {
  const offset = index
    ? isString(index) ? index : String(index)
    : null;
  const bValues = offset === null
    ? b
    : b.map(i => indexOf(i as Container, offset as PropertyKey));
  const aValues = offset === null
    ? a
    : a.map(i => indexOf(i as Container, offset as PropertyKey));

  const forA = a.filter(i => !bValues.includes(indexOf(i as Container, offset as PropertyKey)));
  const forB = b.filter(i => !aValues.includes(indexOf(i as Container, offset as PropertyKey)));

  return [forA, forB] as unknown as Unique<A,B,TIndex>;
}
