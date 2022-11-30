import { Narrowable } from "src/types";
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
  return (typeof i === "boolean" && i === true) as IsTrue<T>;
}

/**
 * **ifTrue**
 *
 * Strongly type-aware conditional statement which checks whether a value is
 * a _true_ and returns one of two values (strongly typed) based on the evaluation
 * of this criteria.
 *
 * @param val the value being tested
 * @param ifVal the value (strongly typed) returned if val is _true_ value
 * @param elseVal the value (strongly typed) returned if val is NOT a _true_ value
 */
export function ifTrue<T extends Narrowable, IF, ELSE>(val: T, ifVal: IF, elseVal: ELSE) {
  return (isTrue(val) ? ifVal : elseVal) as IsTrue<T> extends true ? IF : ELSE;
}
