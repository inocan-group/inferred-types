import { IfNotStringLiteral, Split } from "src/types";


/**
 * **Chars**`<TStr>`
 * 
 * Takes a literal string and converts it to an array of characters.
 */
export type Chars<TStr extends string> = IfNotStringLiteral<
  TStr, 
  readonly string[],
  Split<TStr,""> & readonly string[]
>;
