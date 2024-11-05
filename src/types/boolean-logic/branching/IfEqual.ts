import { IsEqual } from "inferred-types/dist/types/index";

/**
 * **IfEqual**`<X,Y,[IF],[ELSE]>`
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

/**
 * **IfEqual**`<X,Y,[IF],[ELSE]>`
 *
 * Type utility which returns type `IF` _if_ `X` is equal to `Y`; otherwise returns
 * type `ELSE`.
 *
 * **Note:** this is just a type alias for `IfEqual`
 */
export type IfEquals<
X,
Y,
IF = X & Y,
ELSE = Exclude<X,Y>
> = IfEqual<X,Y,IF,ELSE>;
