import { IsTuple } from "src/types";

/**
 * **IfTuple**`<T,IF,ELSE>`
 * 
 * A branching utility which returns type `IF` when `T` is a tuple
 * and `ELSE` otherwise.
 */
export type IfTuple<
  T,
  IF,
  ELSE
> = IsTuple<T> extends true
? IF
: ELSE;
