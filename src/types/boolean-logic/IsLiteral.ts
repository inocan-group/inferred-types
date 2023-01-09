import { Narrowable } from "../Narrowable";
import { IsBooleanLiteral } from "./boolean";

/**
 * **IsStringLiteral**
 *
 * Type utility which returns true/false if the string a _string literal_ versus
 * just the _string_ type.
 */
export type IsStringLiteral<T extends Narrowable> = [T] extends [string]
  ? string extends T
    ? false
    : true
  : false;

/**
 * **IfStringLiteral**
 *
 * Branch utility which returns `IF` type when `T` is a string literal and `ELSE` otherwise
 */
export type IfStringLiteral<T extends Narrowable, IF extends Narrowable, ELSE extends Narrowable> = [
  IsStringLiteral<T>
] extends [true]
  ? IF
  : ELSE;

/**
 * **IsNumericLiteral**
 *
 * Type utility which returns true/false if the numeric value a _numeric literal_ versus
 * just the _number_ type.
 */
export type IsNumericLiteral<T extends Narrowable> = number extends T ? false : true;

/**
 * **IfNumericLiteral**`<T,IF,ELSE>`
 *
 * Branch utility which returns `IF` type when `T` is a numeric literal and `ELSE` in all
 * other situations.
 */
export type IfNumericLiteral<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsNumericLiteral<T> extends true ? IF : ELSE;

// [note on handling of boolean](https://stackoverflow.com/questions/74213646/detecting-type-literals-works-in-isolation-but-not-when-combined-with-other-lite/74213713#74213713)

/**
 * **IsLiteral**
 *
 * Type utility which returns true/false if the value passed -- a form of a
 * string, number, or boolean -- is a _literal_ value of that type (true) or
 * the more generic wide type (false).
 */
export type IsLiteral<T> = [T] extends [string]
  ? IsStringLiteral<T>
  : [T] extends [boolean]
  ? IsBooleanLiteral<T>
  : [T] extends [number]
  ? IsNumericLiteral<T>
  : false;

/**
 * **IsOptionalLiteral**
 *
 * Type utility which returns true/false if the value passed -- a form of a
 * string, number, or boolean -- is a _literal_ value of that type (true) or
 * the more generic wide type (false).
 *
 * This type also strips off _undefined_ from any possible union type to evaluate
 * to `true` even when a literal value is in union with _undefined_. If you don't
 * want to test for the union with _undefined_ use the `IsOptional` utility instead.
 */
export type IsOptionalLiteral<T> = [Exclude<T, undefined>] extends [string]
  ? IsStringLiteral<Exclude<T, undefined>>
  : [Exclude<T, undefined>] extends [boolean]
  ? IsBooleanLiteral<Exclude<T, undefined>>
  : [Exclude<T, undefined>] extends [number]
  ? IsNumericLiteral<Exclude<T, undefined>>
  : false;

/**
 * **IfLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value and `ELSE` otherwise
 */
export type IfLiteral<
  T, 
  IF extends Narrowable, 
  ELSE extends Narrowable
> = IsLiteral<T> extends true
  ? IF
  : ELSE;

/**
 * **IfOptionalLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value (with possibly
 * the inclusion of _undefined_); otherwise returns the type `ELSE`
 */
export type IfOptionalLiteral<
  T,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsOptionalLiteral<T> extends true ? IF : ELSE;
