import type { HasCharacters, If, UpperAlphaChar } from "inferred-types/types";

/**
 * **IsAllLowercase**`<T>`
 *
 * Boolean operator which indicates whether `T` has _all_ lowercase characters in it.
 * Valid values are:
 *
 * - note: any non-alphabetic characters are ignored in the evaluation
 *
 * ```ts
 * // true
 * type T = AllCaps<"foobar">;
 * // false
 * type T = AllCaps<"FooBar">;
 * // boolean
 * type T = AllCaps<string>;
 * ```
 */
export type IsAllLowercase<T extends string> = string extends T
  ? boolean
  : If<HasCharacters<T, UpperAlphaChar>, true, false>;
