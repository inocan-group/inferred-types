import type {
    NON_ZERO_NUMERIC_CHAR,
    NUMERIC_CHAR,
} from "inferred-types/constants";

/**
 * **NumericChar**
 *
 * Numeric string characters.
 *
 * **Related:** `NUMERIC_CHAR`, `Digit`
 */
export type NumericChar = typeof NUMERIC_CHAR[number];

/**
 * **NonZeroNumericChar**
 *
 * Numeric string characters with the exception of "0".
 */
export type NonZeroNumericChar = typeof NON_ZERO_NUMERIC_CHAR[number];

export type NumericChar__ZeroToOne = "0" | "1";
export type NumericChar__ZeroToTwo = "0" | "1" | "2";
export type NumericChar__ZeroToThree = "0" | "1" | "2" | "3";
export type NumericChar__ZeroToFour = "0" | "1" | "2" | "3" | "4";
export type NumericChar__ZeroToFive = "0" | "1" | "2" | "3" | "4" | "5";

export type NumericChar__OneToTwo = "1" | "2";
export type NumericChar__OneToThree = "1" | "2" | "3";
export type NumericChar__OneToFour = "1" | "2" | "3" | "4";
export type NumericChar__OneToFive = "1" | "2" | "3" | "4" | "5";

export type NumericChar__NonZero = Exclude<NumericChar, "0">
