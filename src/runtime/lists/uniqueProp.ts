import { AnyObject, Unique, UniqueByProp } from "src/types";
import { keys } from "../keys";
import { getEach } from "./getEach";

/**
 * **unique**
 * 
 * Runtime utility which removes intersecting values from two sets and
 * provides a unique values contained in each set.
 */
export function uniqueByProp<
  A extends readonly AnyObject[],  
  B extends readonly AnyObject[],
  P extends string
>(a: A, b: B, prop: P): Unique<A,B> {
  const aKeys = getEach(a, prop);
  const bKeys = getEach(b, prop);
  console.log({aKeys,bKeys});
  

  const forA = a.filter(i => prop in i).filter(i => !bKeys.includes(i as any));
  const forB = b.filter(i => prop in i).filter(i => !aKeys.includes(i as any));

  return [forA, forB] as unknown as UniqueByProp<A,B,P>;
}
