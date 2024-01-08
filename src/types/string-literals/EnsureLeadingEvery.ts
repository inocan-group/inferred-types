import {  EnsureLeading, ToString, UnionToTuple } from "..";


/**
 * **EnsureLeadingEvery**`<TList, TLeader>`
 *
 * Ensures that each item in `TList` starts with `TLeader`.
 * 
 * - `TList` can be made up of strings or numbers
 * - `TLeader` can be made up of string, number, or boolean values
 * - all non-string values are converted to string with `ToString`
 * 
 * **Related:** `EnsureLeading`, `EnsureTrailing`
 */
export type EnsureLeadingEvery<
  TList extends readonly (string | number | boolean)[],
  TLeader extends string
> = UnionToTuple< {
  [K in keyof TList]: EnsureLeading<ToString<TList[K]>, TLeader>
}[number]>;
