import type { Container, Intersection, } from "inferred-types/types";
import { isIndexable, getEach,  get } from "inferred-types/runtime";
import { ifNotNull } from "../boolean-logic/ifNotNull";

function intersectWithOffset<
  A extends readonly unknown[],
  B extends readonly unknown[],
  TDeref extends string | number
>(a: A, b: B, deref: TDeref) {
  const aIndexable = a.every(i => isIndexable(i));
  const bIndexable = b.every(i => isIndexable(i));

  if (!aIndexable || !bIndexable) {
    if (!aIndexable) {
      throw new Error(`The "a" array passed into intersect(a,b) was not fully composed of indexable properties: ${a.map(i => typeof i).join(", ")}`);
    } else {
      throw new Error(`The "b" array passed into intersect(a,b) was not fully composed of indexable properties: ${b.map(i => typeof i).join(", ")}`);
    }
  }

  const aMatches = getEach(a, deref as any) as readonly unknown[];
  const bMatches = getEach(b, deref as any) as readonly unknown[];

  const sharedKeys = ifNotNull(
    deref,
    v => [
      a.filter(i => Array.from(bMatches).includes(get(i as Container, v as string | null))),
      b.filter(i => Array.from(aMatches).includes(get(i as Container, v as string | null)))
    ],
    () => a.filter(k => b.includes(k))
  );

  return sharedKeys;
}

function intersectNoOffset<
  A extends readonly unknown[],
  B extends readonly unknown[],
>(a: A, b: B) {
  return a.length < b.length
    ? a.filter((val) => b.includes(val))
    : b.filter((val) => a.includes(val));
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
  TDeref extends string | null = null
>(
  a: A,
  b: B,
  deref: TDeref = null as TDeref
): Intersection<A, B, TDeref> => {
  return (
    deref === null
      ? intersectNoOffset(a, b) as unknown
      : intersectWithOffset(a, b, deref) as unknown
  ) as unknown as Intersection<A, B, TDeref>;
};
