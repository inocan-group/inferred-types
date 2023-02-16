import { Digit } from "./Digit";

/**
 * **DigitNonZero**
 * 
 * A non-zero based digit (aka, 1-9).
 */
export type DigitNonZero = Exclude<Digit, 0>;
