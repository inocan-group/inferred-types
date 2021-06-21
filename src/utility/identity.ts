import { Narrowable } from "~/types/Narrowable";
/**
 * An identity function for any type, with the goal of preserving literal type information
 * whereever possible.
 */
export const identity = <
  N extends Narrowable,
  T extends Record<any, N> | number | string | boolean | symbol | undefined | null
>(v: T) => v;
