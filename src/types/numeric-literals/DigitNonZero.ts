import { Digit } from "inferred-types/dist/types/index";

/**
 * **DigitNonZero**
 *
 * A non-zero based digit (aka, 1-9).
 */
export type DigitNonZero = Exclude<Digit, 0>;
