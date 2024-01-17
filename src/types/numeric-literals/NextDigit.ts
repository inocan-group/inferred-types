import { 
  Digit, 
  ToString, 
  ToNumber, 
  NumericChar 
} from "src/types/index";

/**
 * **NextDigit**`<T>`
 * 
 * Given a numeric digit, this utility provides the next numeric digit in sequence.
 * 
 * - this includes the overflow condition of `9` -> `0`
 * - a string literal digit can be passed in as well and the next string literal
 * digit will be returned
 * ```ts
 * // 5
 * type N = NextDigit<4>;
 * // "5"
 * type S = NextDigit<"4">;
 * ```
 */
export type NextDigit<T extends Digit | NumericChar> = T extends `${NumericChar}`
? ToString<NextDigit<ToNumber<T>>>
: T extends 0 ? 1
: T extends 1 ? 2
: T extends 2 ? 3
: T extends 3 ? 4
: T extends 4 ? 5
: T extends 5 ? 6
: T extends 6 ? 7
: T extends 7 ? 8
: T extends 8 ? 9
: T extends 9 ? 0
: never;
