import { getEach } from "./getEach";
import { find } from "./find";
import { AnyObject, Intersection, IntoSet, SetCandidate } from "src/types";
import { intoSet } from "./intoSet";
import { isObject } from "../type-guards";
import { get } from "../dictionary/get";

/**
 * **intersection**(a,b,[deref])
 * 
 * A set operation which provides the _intersection_ of sets between `a`
 * and `b`. 
 * 
 * - if you are comparing sets of objects (or tuples) you can also provide
 * a `deref` property to make the comparison be done on a particular property/index
 * of each item.
 * - also bear in mind that if `A` and `B` are objects they will be converted to
 * KV pairs as this is a "set" operation and objects are not iterable.
 */
export const intersection = <
  A extends SetCandidate,
  B extends SetCandidate,
  TDeref extends string | number | null = null
>(
  a: A, 
  b: B, 
  deref: TDeref = null as TDeref
) => {
  // ensure A and B _are_ sets; which means converting objects to KV
  const aa = intoSet(a);
  const bb = intoSet(b);
  
  const aMatches = deref
    ? getEach(aa, deref)
    : aa;
  const bMatches = deref
    ? getEach(bb, deref)
    : bb;

  const sharedKeys = [...aMatches].filter(k => [...bMatches].includes(k as any));
  console.log({sharedKeys});

  return (
    deref 
      ? [...aa.filter(i => sharedKeys.includes(get(i, deref)))]
      : sharedKeys
  ) as Intersection<IntoSet<A>, IntoSet<B>, TDeref>;
};
