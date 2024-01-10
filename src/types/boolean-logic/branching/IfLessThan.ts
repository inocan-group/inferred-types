import { LessThan } from "src/types/numeric-literals";

/**
 * **IfLessThan**`<TVal,TCompare,TIf,[TElse]>`
 * 
 * Branching utility which return `TIf` when `TVal` it is _less than_ `TCompare`.
 * 
 * **Related:** `IfNegative`
 */
export type IfLessThan<
  TVal extends number, 
  TCompare extends number,
  TIf,
  TElse extends TVal
> = LessThan<TVal, TCompare> extends true
? TIf
: TElse;


