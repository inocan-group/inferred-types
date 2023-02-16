import { AfterFirst, First } from "../../lists";
import { IsEqual } from "./IsEqual";

/**
 * **IsAnyEqual**`<TVal,TList>`
 * 
 * Boolean tester which reports on whether `TVal` equals **any** of
 * the values in `TList`.
 */
export type IsAnyEqual<TVal, TList extends readonly unknown[]> = //
  [] extends TList
    ? true
    : IsEqual<TVal,First<TList>> extends true
      ? IsAnyEqual<TVal, readonly [...AfterFirst<TList>]>
      : false;
