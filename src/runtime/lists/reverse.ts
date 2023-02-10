import { Reverse } from "src/types";

/**
 * **reverse**(list)
 * 
 * Allows reversing the order of a readonly array and preserving the types.
 */
export const reverse = <T extends readonly any[]>(list: T): Reverse<T> => {
  return [...list].reverse() as unknown as Reverse<T>;
};
