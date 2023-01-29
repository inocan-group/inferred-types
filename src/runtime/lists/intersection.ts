import { getEach } from "./getEach";
import { find } from "./find";

/**
 * **intersection**(a,b,[deref])
 * 
 * A set operation which provides the _intersection_ of sets between `a`
 * and `b`. 
 * 
 * If you are comparing sets of objects (or tuples) you can also provide
 * a `deref` property to make the comparison be done on a particular property/index
 * of each item.
 */
export const intersection = <
  A extends readonly any[],
  B extends readonly any[],
  TDeref extends string | number | null = null
>(a: A, b: B, deref: TDeref = null as TDeref) => {
  const aKeys = deref 
    ? [...getEach(a, deref)]
    : a;

  const sharedKeys = aKeys.filter(k => find(b,deref)(k));

  return (
    deref 
      ? a.filter(i => find(b, deref)(i))
      : sharedKeys
  );
  // TODO: setting type with `Intersection<A,B,TDeref>` fails here but works in all tests
};
