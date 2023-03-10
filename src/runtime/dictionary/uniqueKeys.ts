import { Unique, AnyObject } from "src/types";
import { keysOf } from "./keysOf";

/**
 * **uniqueKeys**(a,b)
 * 
 * Evaluates two objects -- `A` and `B` -- and returns a tuple with the
 * unique properties on each object.
 */
export const uniqueKeys = <
  A extends AnyObject,
  B extends AnyObject
>(a: A, b: B) => {
  const ka = keysOf(a);
  const kb = keysOf(b);

  return [
    ka.filter(i => !kb.includes(i)), 
    kb.filter(i => !ka.includes(i))
  ] as unknown as Unique<typeof ka, typeof kb>;
};
