import { Unique, AnyObject } from "src/types";
import { keys } from "./keys";

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
  const ka = keys(a);
  const kb = keys(b);

  return [
    ka.filter(i => !kb.includes(i)), 
    kb.filter(i => !ka.includes(i))
  ] as unknown as Unique<typeof ka, typeof kb>;
};
