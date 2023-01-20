import { AfterFirst, First } from "../lists";
import { ToString } from "../type-conversion";
import { EnsureLeading } from "./EnsureLeading";

type CreateLeading<
  TList extends readonly (string | number)[],
  TLeader extends string,
  TResults extends readonly string[] = []
> = [] extends TList
  ? TResults
  : CreateLeading<
      AfterFirst<TList>,
      TLeader,
      readonly [
        ...TResults, 
        EnsureLeading<
          First<TList> & (string | number),
          TLeader
        >
      ]
    >;


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
  TList extends readonly (string | number)[],
  TLeader extends string | number | boolean
> = CreateLeading<
  TList, 
  ToString<TLeader>
>;
