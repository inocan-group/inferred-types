import { AfterFirst, First } from "src/types/lists";

/**
 * **Contains**`<TList,TContains>`
 *
 * Checks whether a list -- `TList` -- contains a value of `TContains`.
 * 
 * **Related:** `NarrowlyContains`
 */
export type Contains<
  TList extends readonly unknown[],
  TContains, 
> = [] extends TList
  ? false
  : First<TList> extends TContains
  ? true
  : [] extends AfterFirst<TList>
  ? false
  : Contains<AfterFirst<TList>, TContains>;
