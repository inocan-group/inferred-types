import { SetCandidate } from "src/types/lists/set-ops"
import { getEach } from "./getEach";
import { indexOf } from "./indexOf";

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
  TDereference extends string | number | null = null
>(a: A, b: B, deref?: TDereference) => {
  deref = deref || null as TDereference;
  return a.filter(el => getEach(b, deref).includes(indexOf(a, deref)));
}