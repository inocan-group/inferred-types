import { IsBooleanLiteral } from "./IsBooleanLiteral";
import { IsStringLiteral } from "./IsStringLiteral";
import { IsNumericLiteral } from "./IsNumericLiteral";

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
export type IfLiteral<T, IF, ELSE> = IsLiteral<T> extends true ? IF : ELSE;

/**
 * **IfOptionalLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value (with possibly
 * the inclusion of _undefined_); otherwise returns the type `ELSE`
 */
export type IfOptionalLiteral<T, IF, ELSE> = IsOptionalLiteral<T> extends true ? IF : ELSE;
