import { Narrowable, Unique } from "src/types";

/**
 * **unique**
 * 
 * Runtime utility which removes intersecting values from two sets and
 * provides a unique values contained in each set.
 */
export function unique<
  A extends readonly Narrowable[],  B extends readonly Narrowable[]
>(a: A, b: B): Unique<A,B> {
  const forA = a.filter(i => !b.includes(i));
  const forB = b.filter(i => !a.includes(i));

  return [forA, forB] as unknown as Unique<A,B>;
}
