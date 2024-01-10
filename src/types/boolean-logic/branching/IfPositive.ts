import { LessThan } from "src/types/numeric-literals/LessThan";

/**
 * **IfPositive**`<TVal,TIf,[TElse]>`
 * 
 * Branching utility which return `TIf` when `TVal` is _greater than or equal_ to 0.
 * 
 * **Related:** `IfLessThan`
 */
export type IfPositive<
  TVal extends number,
  TIf,
  TElse extends TVal
> = LessThan<TVal, 0> extends true
? TElse
: TIf;
