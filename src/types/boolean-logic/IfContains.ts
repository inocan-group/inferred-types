import { Narrowable } from "../literals/Narrowable";
import { Contains } from "./Contains";

/**
 * **IfContains**`<TList,TContains,IF,ELSE>`
 *
 * Branching utility which check 
 * 
 * **Related:** `NarrowlyContains`
 */
export type IfContains<
  TList extends readonly unknown[],
  TContains extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = Contains<TList, TContains> extends true
  ? IF
  : ELSE;
