import { IsEqual } from "src/types/boolean-logic";

/**
 * **IfEqual**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns type `IF` _if_ `X` is equal to `Y`; otherwise returns
 * type `ELSE`.
 */
export type IfEqual<
  X,
  Y, 
  IF = X & Y, 
  ELSE = Exclude<X,Y>
> = IsEqual<X,Y> extends true
  ? IF
  : ELSE;
