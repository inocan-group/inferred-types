import { IsTuple, Tuple } from "src/types/index";

/**
 * **IfNotTuple**`<T,[TIf],[TElse]>`
 * 
 * Branching utility based on whether `T` is a Tuple.
 */
export type IfNotTuple<
  T,
  TIf = Exclude<T, Tuple>,
  TElse = T & Tuple
> = IsTuple<T> extends true
? TIf
: TElse;
