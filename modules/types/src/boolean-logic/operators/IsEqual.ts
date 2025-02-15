import type { IsAny } from "./IsAny";
import type { IsTrue } from "./IsTrue";

type Test<
  X,
  Y,
  TRUE = true,
  FALSE = false,
> = (
  <T>() => T extends X
    ? 1
    : 2
) extends <T>() => T extends Y ? 1 : 2
  ? TRUE
  : FALSE;

/**
 * **IsEqual**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type.
 *
 * - by default if either `X` or `Y` is an `any` value then this returns `never`
 * - if you'd like to allow the **any** type to be considered set `AllowNever` to true
 */
export type IsEqual<
  X,
  Y,
  TRUE = true,
  FALSE = false,
  AllowNever = false,
> = [IsAny<X>] extends [true]
  ? [IsAny<Y>] extends [true]
      ? [IsTrue<AllowNever>] extends [true] ? true : never
      : [IsTrue<AllowNever>] extends [true] ? false : never
  : [boolean] extends [X]
      ? [boolean] extends [Y]
          ? true
          : false
      : Test<X, Y, TRUE, FALSE>;

/**
 * **Equals**`<X,Y>`
 *
 * Type utility which tests whether two types -- `X` and `Y` -- are exactly the same type
 */
export type Equals<X, Y, TTrue = true, TFalse = false> = IsEqual<X, Y, TTrue, TFalse>;
