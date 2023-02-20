import { Contains } from "src/types/boolean-logic";

/**
 * **IfContains**`<TList,TContains,IF,ELSE>`
 *
 * Branching utility which check 
 * 
 * **Related:** `NarrowlyContains`
 */
export type IfContains<
  TList extends readonly unknown[],
  TContains,
  IF,
  ELSE
> = Contains<TList, TContains> extends true
  ? IF
  : ELSE;
