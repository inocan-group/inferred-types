import { NarrowlyContains } from "src/types/boolean-logic";


/**
 * **IfContains**`<TList,TContains,IF,ELSE>`
 *
 * Branching utility which check 
 * 
 * **Related:** `NarrowlyContains`
 */
export type IfNarrowlyContains<
  TList extends readonly unknown[],
  TContains,
  IF,
  ELSE
> = NarrowlyContains<TList, TContains> extends true
  ? IF
  : ELSE;
