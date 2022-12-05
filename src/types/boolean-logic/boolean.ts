import { Narrowable } from "../Narrowable";

export type IsBoolean<T> = T extends boolean ? true : false;

/**
 * Type utility which returns `true` or `false` based on
 * whether the type holds the narrow "true" type.
 * ```ts
 * // true
 * type T = IsTrue<true>;
 * // boolean
 * type U = IsTrue<boolean>;
 * // false
 * type F = IsTrue<false>;
 * type F2 = IsTrue<"false">;
 * ```
 */
export type IsTrue<T extends Narrowable> = IsBoolean<T> extends true
  ? // is a boolean
    T extends true
    ? true
    : T extends false
    ? false
    : unknown
  : // not a boolean
    false;

export type IsFalse<T extends Narrowable> = IsBoolean<T> extends true
  ? // is a boolean
    T extends false
    ? true
    : true extends T
    ? false
    : // is of boolean type; therefore narrow type is unknown
      unknown
  : // not a boolean
    false;

/**
 * Type utility which checks for literal `true` value and then switches type
 * to the IF, ELSE, or MAYBE generic types passed in where _maybe_ is when T
 * is the wide type of `boolean`
 */
export type IfTrue<
  T extends boolean,
  IF extends Narrowable,
  ELSE extends Narrowable,
  MAYBE extends Narrowable
> = IsTrue<T> extends true ? IF : IsTrue<T> extends false ? ELSE : MAYBE;

/**
 * Type utility which checks for literal `false` value and then switches type
 * to the IF, ELSE, or MAYBE generic types passed in where _maybe_ is when T
 * is the wide type of `boolean`
 */
export type IfFalse<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable,
  MAYBE extends Narrowable
> = IsFalse<T> extends true ? IF : IsTrue<T> extends false ? ELSE : MAYBE;

/**
 * **IsBooleanLiteral**
 *
 * Type utility which returns true/false if the boolean value is a _boolean literal_ versus
 * just the wider _boolean_ type.
 */
export type IsBooleanLiteral<T extends Narrowable> = IsTrue<T> extends true
  ? true
  : IsFalse<T> extends true
  ? true
  : false;

/**
 * **IfBooleanLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a boolean literal and `ELSE` otherwise
 */
export type IfBooleanLiteral<
  T extends boolean,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsBooleanLiteral<T> extends true ? IF : ELSE;