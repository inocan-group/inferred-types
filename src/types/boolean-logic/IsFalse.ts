import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";

/**
 * **IsFalse**`<T>`
 * 
 * Type utility which checks for the narrow type of `false`
 * ```ts
 * // true
 * type T = IsFalse<true>;
 * // false
 * type U = IsFalse<boolean>;
 * type F2 = IsFalse<"foobar">;
 * ```
 */
export type IsFalse<T extends Narrowable> = IsBoolean<T> extends true
  ? T extends false
    ? true
    : false
  : false;
