import { IsEqual, Narrowable } from "../../types";

/**
 * **IfEqual**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns type `IF` _if_ `X` is equivalent to `Y`; otherwise returns
 * type `ELSE`.
 */
export type IfEqual<
  X extends Narrowable,
  Y extends Narrowable, 
  IF extends Narrowable = true, 
  ELSE extends Narrowable = false
> = IsEqual<X,Y> extends true
  ? IF
  : ELSE;
