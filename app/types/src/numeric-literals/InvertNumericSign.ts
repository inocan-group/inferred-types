import {
  AsNegativeNumber,
  IsNegativeNumber,
  Abs,
  NumberLike
 } from "@inferred-types/types";


/**
 * **InvertNumericSign**`<T>`
 *
 * Inverts the numeric symbol of the value `T` passed in (aka, negative numbers become
 * positive and visa versa).
 */
export type InvertNumericSign<T extends NumberLike> = IsNegativeNumber<T> extends true
? Abs<T>
: AsNegativeNumber<T>;

