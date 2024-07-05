import { NumberLike } from "src/types/numeric-literals";
import { IsNegativeNumber } from "./IsNegativeNumber";

/**
 * **IsPositiveNumber**`<T>`
 *
 * Boolean operator which checks whether the value `T` is a _positive_ number.
 *
 * **Related:** `IsNegativeNumber`, `Abs`, `InvertNumericSign`
 */
export type IsPositiveNumber<T extends NumberLike> = IsNegativeNumber<T> extends true
? false
: true;
