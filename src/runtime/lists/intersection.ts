/* eslint-disable brace-style */
import { getEach } from "./getEach";
import type {Intersection,  } from "src/types";
import { isNotNull } from "../type-guards";
import { get } from "../dictionary/get";
import { ifNotNull } from "../boolean-logic";

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
  const aMatches = isNotNull(deref)
    ? getEach(a, deref)
    : a;
  const bMatches = isNotNull(deref)
    ? getEach(b, deref)
    : b;  

  const sharedKeys = ifNotNull(
    deref,
    v => [
      a.filter(i => Array.from(bMatches).includes(get(i,String(v)))),
      b.filter(i => Array.from(aMatches).includes(get(i,String(v))))
    ],
    () => a.filter(k => b.includes(k)) 
  );

  return sharedKeys as Intersection<A,B,TDeref>;
};
