import { IsNegativeNumber, NumberLike } from "inferred-types/types";

/**
 * Boolean operator which indicates whether the number passed
 * in is negative.
 */
export function isNegativeNumber<T extends NumberLike>(
    num: T
): IsNegativeNumber<T> {
    return Number(num) < 0 as IsNegativeNumber<T>
}
