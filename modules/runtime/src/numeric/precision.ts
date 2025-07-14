import { retainAfter } from "runtime/string-literals";
import { Precision, NumberLike } from 'inferred-types/types';

/**
 * Provides the number of digits to the _right_ of the decimal
 * place for a given number.
 */
export function precision<T extends NumberLike>(num: T) {
    const digits = retainAfter(`${num}`, ".") as string;

    return digits.length as Precision<T>
}
