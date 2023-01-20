import { ToString } from "../type-conversion";
import { EnsureLeading } from "./EnsureLeading";

type LeadingAcc<
  TList extends readonly (string | number)[],
  TLeader extends string,
  TResults extends readonly string[] = []
> = TList extends [infer First, ...infer Rest]
  ? First extends string | number
    ? Rest extends readonly (string | number)[]
      ? LeadingAcc<
          Rest,
          TLeader,
          [
            ...TResults,
            EnsureLeading<
              First,
              TLeader
            >
          ]
        >
      : never
    : never
    : TResults;


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
> = LeadingAcc<
  TList, 
  ToString<TLeader> & string
>;
