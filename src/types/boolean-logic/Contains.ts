import { AfterFirst, First } from "../lists";

/**
 * **Contains**`<TList,TContains>`
 *
 * Type utility which checks whether a type `TContains` exists within 
 * an array `TList`. Result is `true` if any element in the list _extends_
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
