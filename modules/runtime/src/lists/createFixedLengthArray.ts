import {FixedLengthArray, Narrowable} from "inferred-types/types"

/**
 * **createFixedLengthArray**`(content, quantity)`
 *
 * Provides a type strong array of duplicates of what was
 * passed in as `content`
 */
export const createFixedLengthArray = <
  T extends Narrowable,
  C extends number
>(
  content: T,
  quantity: C
): FixedLengthArray<T,C> => Array(quantity).fill(content) as FixedLengthArray<T,C>;

