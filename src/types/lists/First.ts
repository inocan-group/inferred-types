import { Tuple } from "src/types";

/**
 * **First**`<T>`
 * 
 * Returns the _first_ type in a list.
 * 
 * Typing ensures that list has at a minimum one item in it.
 */
export type First<T extends Tuple> =
  T[0] extends T[number] ? T[0] : never;


