import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";

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
export type IsTrue<T extends Narrowable> = IsBoolean<T> extends true
  ? T extends true
    ? true
    : false
  : false;
