import { HasCharacters } from "src/types/index";

/**
 * **IfHasCharacters**<TVal,TChars,IF,ELSE,[MAYBE]>
 * 
 * Branching utility which branches based on whether `TVal` _has_ the characters defined
 * by `TChars` (which is either a string union or array of strings).
 */
export type IfHasCharacters<
  TVal extends string,
  TChars extends string | readonly string[],
  IF,
  ELSE,
  MAYBE = IF | ELSE
> = HasCharacters<TVal, TChars> extends true 
  ? IF 
  : HasCharacters<TVal, TChars> extends false
    ? ELSE
    : MAYBE;

