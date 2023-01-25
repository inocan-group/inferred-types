import { Narrowable } from "types/literals/Narrowable";

/**
 * An identity function for any type, with the goal of preserving literal type information
 * where ever possible.
 */
export const identity = <
  T extends Narrowable
>(
  v: T
) => v;
