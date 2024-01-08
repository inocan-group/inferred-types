import { IfLiteral, Split } from "..";


/**
 * **Chars**`<TStr>`
 * 
 * Takes a literal string and converts it to an array of characters.
 */
export type Chars<TStr extends string> = IfLiteral<
  TStr,
  Split<TStr,"">,
  never
>;
