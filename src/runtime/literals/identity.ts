

/**
 * An identity function for any type, with the goal of preserving literal type information
 * where ever possible.
 */
export const identity = <
  T
>(
  v: T
) => v;
