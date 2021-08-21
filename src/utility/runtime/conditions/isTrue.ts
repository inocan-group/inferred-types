import { Narrowable } from "~/types";
import type { IsBoolean } from "./isBoolean";

/**
 * Type utility which returns `true` or `false` based on
 * whether the type holds the narrow "true" type.
 * ```ts
 * // true
 * type T = IsTrue<true>;
 * // unknown
 * type U = IsTrue<boolean>;
 * // false
 * type F = IsTrue<false>;
 * type F2 = IsTrue<"false">;
 * ```
 */
export type IsTrue<T> = IsBoolean<T> extends true
  ? // is a boolean
    T extends true
    ? true
    : T extends false
    ? false
    : unknown
  : // not a boolean
    false;

/**
 * Run-time and type checking of whether a variable is `true`.
 */
export function isTrue<T extends Narrowable>(i: T) {
  return (typeof i === "boolean" && i) as IsTrue<T>;
}
