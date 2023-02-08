import { NotEqual } from "@type-challenges/utils";
import { Keys } from "../dictionary/Keys";
import { Length } from "../lists/Length";
import { Narrowable } from "../literals/Narrowable";
import { And, IfAnd } from "./And";
import { IsBooleanLiteral } from "./boolean";
import { IsEqual } from "./IsEqual";
import { IfLength } from "./IfLength";
import { AnyObject } from "./object";
import { IfOr } from "./Or";

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
  : [T] extends [any[]]
    ? IsEqual<Length<T>, number> extends true ?  false : true
    : [T] extends [readonly any[]]
      ? IsEqual<Length<T>, number> extends true ?  false : true
      : [T] extends [AnyObject]
        ? IfOr<
            [
              IsEqual<T, {}>, 
              And<[NotEqual<Length<Keys<T>>, 0>, NotEqual<Keys<T>, readonly [string]>]>
            ],
            true,
            false
          >
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
