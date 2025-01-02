import type { AfterFirst, First } from "inferred-types/types";

/**
 * **EveryLength**`<T,N>`
 *
 * Checks whether every element of `T` has a length of `N`.
 */
export type EveryLength<
  T extends readonly (string | string[])[],
  N extends number,
>
  = [] extends T
    ? true
    : First<T>["length"] extends N
      ? EveryLength<
        AfterFirst<T>,
        N
      >
      : false;
