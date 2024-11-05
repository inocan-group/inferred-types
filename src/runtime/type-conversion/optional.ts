import { Narrowable } from "inferred-types/dist/types/index";



/**
 * **optional**(value)
 *
 * A function which takes the value `T` and widens it to include
 * a union with _undefined_.
 */
export function optional<
  T extends Narrowable
>(value: T) {
  return value as T | undefined;
}

/**
 * **orNull**`(value)`
 *
 * widens the type for the value passed in to be whatever type it
 * currently is _in union with_ `null`.
 */
export function orNull<T extends Narrowable>(value: T) {
  return value as T | null;
}

/**
 * **optionalOrNull**`(value)`
 *
 *  widens the type for the value passed in to be whatever type it
 * currently is _in union with_ `null and `undefined`.
 *
 * **Related:** `optional()`, `orNull()`
 */
export function optionalOrNull<T extends Narrowable>(value: T) {
  return value as T | null | undefined;
}
