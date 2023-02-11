import { Narrowable } from "../literals/Narrowable";
import { NarrowlyContains } from "./NarrowlyContains";


/**
 * **IfContains**`<TList,TContains,IF,ELSE>`
 *
 * Branching utility which check 
 * 
 * **Related:** `NarrowlyContains`
 */
export type IfNarrowlyContains<
  TList extends readonly unknown[],
  TContains extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = NarrowlyContains<TList, TContains> extends true
  ? IF
  : ELSE;
