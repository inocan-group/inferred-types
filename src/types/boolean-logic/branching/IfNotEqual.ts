import type { IsNotEqual } from "src/types/index";

/**
 * **IfNotEqual**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns:
 * 
 * - `IF` _if_ `X` is **not** equal to `Y`; 
 * - otherwise returns type `ELSE`
 * - `ELSE` will _default_ to being the intersection of `X` and `Y`
 */
export type IfNotEqual<
  X,
  Y, 
  IF, 
  ELSE = X&Y
> = IsNotEqual<X,Y> extends true
  ? IF
  : ELSE;

/**
 * **IfNotEquals**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns:
 * 
 * - `IF` _if_ `X` is **not** equal to `Y`; 
 * - otherwise returns type `ELSE`
 * - `ELSE` will _default_ to being the intersection of `X` and `Y`
 */
export type IfNotEquals<
  X,
  Y, 
  IF, 
  ELSE = X&Y
> = IsNotEqual<X,Y> extends true
  ? IF
  : ELSE;
