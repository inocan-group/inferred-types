import { Narrowable } from "../Narrowable";

/**
 * **Equal**`<X extends Narrowable,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

/**
 * **NotEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are _not_ exactly the same type
 */
export type IsNotEqual<X, Y> = true extends IsEqual<X, Y> ? false : true;

/**
 * **IfEqual**`<X,Y,IF,ELSE>`
 * 
 * Type utility which returns type `IF` _if_ `X` is equivalent to `Y`; otherwise returns
 * type `ELSE`.
 */
export type IfEqual<
  X extends Narrowable,
  Y extends Narrowable, 
  IF extends Narrowable, 
  ELSE extends Narrowable
> = IsEqual<X,Y> extends true
  ? IF
  : ELSE;


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
