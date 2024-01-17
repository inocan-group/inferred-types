import {  Chars, First, IfLiteral,  NumberLike } from "src/types/index";

/**
 * **IfNegative**`<TVal,TIf,[TElse]>`
 * 
 * Branching utility which return `TIf` when `TVal` is _less than_ 0.
 * 
 * **Related:** `IfLessThan`
 */
export type IfNegativeNumber<
  TVal extends NumberLike,
  TIf,
  TElse = TVal
> = IfLiteral<
  TVal,
  First<Chars<`${TVal}`>> extends "-"
  ? TIf
  : TElse,
  TIf | TElse
>;
