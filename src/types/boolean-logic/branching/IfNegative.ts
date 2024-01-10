import { LessThan } from "src/types/numeric-literals/LessThan";


/**
 * **IfNegative**`<TVal,TIf,[TElse]>`
 * 
 * Branching utility which return `TIf` when `TVal` is _less than_ 0.
 * 
 * **Related:** `IfLessThan`
 */
export type IfNegative<
  TVal extends number,
  TIf,
  TElse extends TVal
> = LessThan<TVal, 0> extends true
? TIf
: TElse;
