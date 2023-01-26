import { IsEqual } from "src/types/boolean-logic";
import { Narrowable } from "src/types/literals/Narrowable";

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
