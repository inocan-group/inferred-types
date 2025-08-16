import type { AfterFirst, First, IsEqual } from "inferred-types/types";

/**
 * **NarrowlyContains**`<TList, TContains>`
 *
 * Type utility which checks whether all elements in a tuple `TList`
 * **equal** the type contained in `TContains`.s
 *
 * **Related:** `Contains`, `ContainsAll`, `ContainsSome`
 */
export type NarrowlyContains<
    TList extends readonly unknown[],
    TContains,
>

  = IsEqual<
      First<TList>,
      TContains
  > extends true
      ? true
      : [] extends AfterFirst<TList>
          ? false
          : NarrowlyContains<AfterFirst<TList>, TContains>;
