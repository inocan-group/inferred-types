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

export type NumericCharZeroToOne = "0" | "1";
export type NumericCharZeroToTwo = "0" | "1" | "2";
export type NumericCharZeroToThree = "0" | "1" | "2" | "3";
export type NumericCharZeroToFour = "0" | "1" | "2" | "3" | "4";
export type NumericCharZeroToFive = "0" | "1" | "2" | "3" | "4" | "5";

export type NumericCharOneToTwo = "1" | "2";
export type NumericCharOneToThree = "1" | "2" | "3";
export type NumericCharOneToFour = "1" | "2" | "3" | "4";
export type NumericCharOneToFive = "1" | "2" | "3" | "4" | "5";
