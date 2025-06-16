import type { MONTH_ABBR, MONTH_NAME } from "inferred-types/constants";
import type {
    NonZeroNumericChar,
} from "inferred-types/types";


/**
 * **MonthName**
 *
 * The month of the year represented as a full string name.
 */
export type MonthName = typeof MONTH_NAME[number];

/**
 * **MonthAbbr**
 *
 * The month of the year represented in an abbreviated string format.
 */
export type MonthAbbrev = typeof MONTH_ABBR[number];

/**
 * **MonthNumeric**
 *
 * The month of the year represented in a numeric format.
 */
export type MonthNumeric = "10" | "11" | "12" | `${"0" | ""}${NonZeroNumericChar}`;


