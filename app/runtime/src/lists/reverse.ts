import { Reverse } from "@inferred-types/types";

/**
 * **reverse**(list)
 *
 * Allows reversing the order of a readonly array and preserving the types.
 */
export const reverse = <T extends readonly unknown[]>(list: T): Reverse<T> => {
  return [...list].reverse() as unknown as Reverse<T>;
};
