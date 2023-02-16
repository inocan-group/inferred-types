/* eslint-disable brace-style */
import { getEach } from "./getEach";
import type {Intersection,  } from "src/types";
import { get } from "../dictionary/get";
import { ifNotNull } from "../boolean-logic";
import { isIndexable } from "../type-guards/isIndexable";

function intersectWithOffset<
A extends readonly unknown[],
B extends readonly unknown[],
TDeref extends string | number | null
>(a: A, b: B, deref: TDeref) {
  const aIndexable = a.every(i => isIndexable(i));
  const bIndexable = b.every(i => isIndexable(i));

  if(!aIndexable || !bIndexable) {
    if (!aIndexable) {
      throw new Error(`The "a" array passed into intersect(a,b) was not fully composed of indexable properties: ${a.map(i => typeof i).join(", ")}`);
    } else {
      throw new Error(`The "b" array passed into intersect(a,b) was not fully composed of indexable properties: ${b.map(i => typeof i).join(", ")}`);
    }
  }

  const aMatches = getEach(a, deref);
  const bMatches = getEach(b, deref);

  const sharedKeys = ifNotNull(
    deref,
    v => [
      a.filter(i => Array.from(bMatches).includes(get((i as string),v))),
      b.filter(i => Array.from(aMatches).includes(get((i as string),v)))
    ],
    () => a.filter(k => b.includes(k)) 
  );

  return sharedKeys as Intersection<A,B,TDeref>;
}

function intersectNoOffset<
A extends readonly unknown[],
B extends readonly unknown[],
_TDeref extends string | number | null
>(a: A, b: B) {
  // 
}

/**
 * **intersection**(a,b,[deref])
 * 
 * A set operation which provides the _intersection_ between
 * between two array's `a` and `b`. 
 * 
 * - when passing in arrays, you may also pass in a _dereferencing_ property
 * which will be used for arrays of objects (or sub-arrays) so that the comparison
 * is done on the dereferenced value versus the value as a whole. 
 */
export const intersection = <
  A extends readonly unknown[],
  B extends readonly unknown[],
  TDeref extends string | number | null = null
>(
  a: A,
  b: B,
  deref: TDeref = null as TDeref
): Intersection<A,B,TDeref>  => {
  return ifNotNull(deref, intersectWithOffset(a,b,deref), intersectNoOffset(a,b)) as unknown as Intersection<A,B,TDeref>;
};
