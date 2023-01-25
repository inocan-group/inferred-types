import { AfterFirst } from "../lists";
import { First } from "../lists/First";
import { Narrowable } from "../literals/Narrowable";

/**
 * **Equal**`<X extends Narrowable,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

export type IsAnyEqual<X, Y extends readonly any[]> = //
  [] extends Y
    ? true
    : IsEqual<X,First<Y>> extends true
      ? IsAnyEqual<X, readonly [...AfterFirst<Y>]>
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
  IF extends Narrowable = true, 
  ELSE extends Narrowable = false
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


/**
 * **SomeEqual**`<Value, CompareTo>`
 * 
 * A type utility which tests whether `Value` is exactly equal to an array of values
 * stored in `CompareTo`. Possible results are `true`, `false`. A wide `boolean` type
 * is not possible as equality operator can always be evaluated at design time.
 * 
 * **See Also:** `SomeExtends` and `IfSomeEqual`
 */
export type SomeEqual<Value, CompareTo extends readonly any[]> = [] extends CompareTo
? false
: IfEqual<Value, First<CompareTo>, true, SomeEqual<Value, AfterFirst<CompareTo>>>;

/**
 * **IfSomeEqual**`<Value, CompareTo, IF, ELSE>`
 * 
 * A type utility which evaluates whether `Value` is equal to any of the values in
 * `CompareTo` and if so then it returns `IF` otherwise `ELSE`.
 */
export type IfSomeEqual<
  Value extends Narrowable, 
  CompareTo extends readonly any[],
  IF,
  ELSE
> = SomeEqual<Value, CompareTo> extends true ? IF : ELSE;
