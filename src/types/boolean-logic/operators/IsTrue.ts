import { IsEqual , IsNever } from "src/types/index";

/**
 * **IsTrue**`<T,[TNever]>`
 * 
 * Type utility which checks for the narrow type of `true`
 * ```ts
 * // true
 * type T = IsTrue<true>;
 * // false
 * type U = IsTrue<boolean>;
 * // false
 * type F2 = IsTrue<"foobar">;
 * ```
 */
export type IsTrue<
  T,
  TNever = never
> = [IsNever<T>] extends [true]
? TNever
: [IsEqual<T, true>] extends [true]
  ? true
  : false;
