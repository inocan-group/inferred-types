import type { Narrowable } from "../literals/index";
import type { IsNotEqual } from "./index";

/**
 * **IfEqual**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns type `IF` _if_ `X` is equivalent to `Y`; otherwise returns
 * type `ELSE`.
 */
export type IfNotEqual<
  X extends Narrowable,
  Y extends Narrowable, 
  IF extends Narrowable, 
  ELSE extends Narrowable
> = IsNotEqual<X,Y> extends true
  ? IF
  : ELSE;

