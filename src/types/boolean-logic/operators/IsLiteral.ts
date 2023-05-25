import type { 
  Length, 
  IsBooleanLiteral, 
  IsEqual, 
  IsNumericLiteral, 
  IsObjectLiteral, 
  IsStringLiteral, 
 AnyObject } from "src/types";


// [note on handling of boolean](https://stackoverflow.com/questions/74213646/detecting-type-literals-works-in-isolation-but-not-when-combined-with-other-lite/74213713#74213713)

/**
 * **IsLiteral**`<T>`
 *
 * Boolean type literal which tests whether `T` is a _literal_ value or not.
 * 
 * - ensures that strings, numbers, and boolean values are literal/narrow types
 * - ensures that arrays (including readonly arrays) have a known set of values (length known at design time); some of the known values in the tuple _may_ be wide types
 * - ensures that objects have a known set of keys (including no keys)
 * - symbols, and null values will return **true** as they are always unique
 * - _undefined_ will always return **false**
 * - a **literal array** is one where the discrete elements are known; some of the elements _may_ be wide types
 * 
 */
export type IsLiteral<T> = [T] extends [string]
  ? IsStringLiteral<T>
  : [T] extends [boolean]
  ? IsBooleanLiteral<T>
  : [T] extends [number]
  ? IsNumericLiteral<T>
  : [T] extends [unknown[]]
    ? IsEqual<Length<T>, number> extends true ?  false : true
    : [T] extends [readonly unknown[]]
      ? IsEqual<Length<T>, number> extends true ?  false : true
      : [T] extends [AnyObject]
        ? IsObjectLiteral<T & AnyObject>
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
 * **IfOptionalLiteral**
 *
 * Branch type utility with return `IF` when `T` is a _literal_ value (with possibly
 * the inclusion of _undefined_); otherwise returns the type `ELSE`
 */
export type IfOptionalLiteral<
  T,
  IF,
  ELSE
> = IsOptionalLiteral<T> extends true ? IF : ELSE;
