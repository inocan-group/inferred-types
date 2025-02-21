import type {
  ToStringArray,
} from "inferred-types/types";

type SuggestString<
  T extends readonly string[],
> = T[number] | (string & {});

/**
 * **Suggest**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of string literals which _could_ be the value for
 * a string based property but _allows_ a string that
 * is not part of the suggestion to be typed in too.
 *
 * - `T` can be a _union_ of string literals or an
 * _array_ of string literals.
 * - If T is a wide string then we must return
 * just a wide string as no suggestions are possible
 */
export type Suggest<
  T extends readonly unknown[] | string,
> = T extends readonly unknown[]
  ? ToStringArray<T> extends readonly string[]
    ? SuggestString<ToStringArray<T>> extends string
      ? SuggestString<ToStringArray<T>>
      : never
    : never
  : T extends string
    ? T | (string & {})
    : never;

/**
 * **SuggestNumeric**`<T>`
 *
 * Type utility that helps to build a enumerated set
 * of numeric literals which _could_ be the value for
 * a number based property but _allows_ a number that
 * is not part of the suggestion to be typed in too.
 */
export type SuggestNumeric<T extends number> = T | (number & {});
