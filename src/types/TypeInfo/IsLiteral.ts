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
export type IsLiteral<T extends string | number | boolean> = [T] extends [string]
  ? IsStringLiteral<T>
  : [T] extends [boolean]
  ? IsBooleanLiteral<T>
  : [T] extends [number]
  ? IsNumericLiteral<T>
  : never;
