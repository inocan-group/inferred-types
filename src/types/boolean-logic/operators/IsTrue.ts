import { IsEqual , IsNever } from "src/types";

/**
 * **IsTrue**`<T>`
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
export type IsTrue<T> = IsNever<T> extends true
? never
: IsEqual<T, true> extends true
  ? true
  : false;
