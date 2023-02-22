import { Digit, NumericChar } from "../string-literals";
import { ToString, ToNumber } from "src/types/type-conversion";

/**
 * **PriorDigit**`<T>`
 * 
 * Given a numeric digit, this utility provides the next numeric digit in sequence.
 * 
 * - this includes the overflow condition of `0` -> `9`
 * - a string literal digit can be passed in as well and the next string literal
 * digit will be returned
 * ```ts
 * // 4
 * type N = PriorDigit<5>;
 * // "4"
 * type S = PriorDigit<"5">;
 * ```
 */
export type PriorDigit<T extends Digit | NumericChar> = T extends `${NumericChar}`
? ToString<PriorDigit<ToNumber<T>>>
: T extends 0 ? 9
: T extends 1 ? 0
: T extends 2 ? 1
: T extends 3 ? 2
: T extends 4 ? 3
: T extends 5 ? 4
: T extends 6 ? 5
: T extends 7 ? 6
: T extends 8 ? 7
: T extends 9 ? 8
: never;
