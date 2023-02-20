import type { IsNotEqual } from "src/types/boolean-logic";

/**
 * **IfEqual**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns type `IF` _if_ `X` is equivalent to `Y`; otherwise returns
 * type `ELSE`.
 */
export type IfNotEqual<
  X,
  Y, 
  IF, 
  ELSE
> = IsNotEqual<X,Y> extends true
  ? IF
  : ELSE;

