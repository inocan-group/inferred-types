
import {
  If,
  NumberLike,
  IsNegativeNumber,
  IsPositiveNumber
} from "@inferred-types/types";

/**
 * **HaveSameNumericSign**`<A,B>`
 *
 * Validates that `A` _and_ `B` are both negative number or both
 * positive numbers.
 */
export type HaveSameNumericSign<
  A extends NumberLike,
  B extends NumberLike
> = If<
  IsPositiveNumber<A>,
  IsPositiveNumber<B> extends true ? true : false,
  IsNegativeNumber<B> extends true ? true : false
>


