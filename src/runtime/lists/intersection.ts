/* eslint-disable brace-style */
import { getEach } from "./getEach";
import type {  AnyObject, Intersection, Narrowable, SharedKeys, WithKeys } from "src/types";
import { isArray, isObject, isReadonlyArray, isNotNull } from "../type-guards";
import { sharedKeys } from "src/runtime/dictionary/sharedKeys";
import { withKeys } from "src/runtime/dictionary/withKeys";
import { get } from "../dictionary/get";

type Return<
A extends AnyObject | readonly Narrowable[],
  B extends  AnyObject | readonly Narrowable[],
  TDeref extends string | number | null 
> = A extends AnyObject
? B extends AnyObject
    ? readonly [ 
      WithKeys<A, SharedKeys<A,B>>, WithKeys<B, SharedKeys<A,B>> 
    ]
  : never
: A extends readonly Narrowable[]
  ? B extends readonly Narrowable[]
    ? Intersection<A,B,TDeref>
    : never
  : never;


/**
 * **intersection**(a,b,[deref])
 * 
 * A set operation which provides the _intersection_ between `a`
 * and `b` where both are either objects or arrays. 
 * 
 * - when passing in arrays, you may also pass in a _dereferencing_ property
 * which will be used for arrays of objects (or sub-arrays) so that the comparison
 * is done on the dereferenced value versus the value as a whole. 
 */
export const intersection = <
  A extends AnyObject | readonly Narrowable[],
  B extends  AnyObject | readonly Narrowable[],
  TDeref extends string | number | null = null
>(
  a: A, 
  b: B,
  deref: TDeref = null as TDeref
): Return<A,B,TDeref>  => {

  // handle dictionaries
  if(isObject(a) && isObject(b)) {
    const k = sharedKeys(a,b);
    return (
      isReadonlyArray(k)
      ? [ withKeys(a, ...k), withKeys(b, ...k) ]
      : [ {}, {}]
    ) as unknown as Return<A,B,TDeref>;
  }
  // handle arrays
  else if(isArray(a) && isArray(b)) {
    const aMatches = isNotNull(deref)
      ? getEach(a, deref)
      : a;
    const bMatches = isNotNull(deref)
      ? getEach(b, deref)
      : b;

      const sharedKeys = isNotNull(deref)
      ?  [
        a.filter(i => Array.from(bMatches).includes(get(i,deref))),
        b.filter(i => Array.from(aMatches).includes(get(i,deref)))
      ] as Intersection<A,B,TDeref>
      : a.filter(k => b.includes(k as any)) as Intersection<A,B,TDeref>;

      return sharedKeys as unknown as Return<A,B,TDeref>;
  } else {
    throw new Error(`Invalid inputs to intersection() function. This function expects "a" and "b" to both be an object or an array. The types received were: { a: ${typeof a}, b: ${typeof b}}`);
  }

};
