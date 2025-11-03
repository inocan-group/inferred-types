import { narrow } from "./utils/narrow";

/**
 * **NUMERIC_CHAR**
 *
 * A tuple containing all numeric characters.
 *
 * **Related:** `NumericChar`
 */
export const NUMERIC_CHAR = narrow(
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
);

export const NON_ZERO_NUMERIC_CHAR = narrow(
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
);

/**
 * **HEXADECIMAL_CHAR**
 *
 * All numeric and alpha (upper and lower) characters used to represent
 * a **hexadecimal** number.
 */
export const HEXADECIMAL_CHAR = narrow(
    ...NUMERIC_CHAR,
    "a",
    "A",
    "b",
    "B",
    "c",
    "C",
    "d",
    "D",
    "e",
    "E",
    "f",
    "F"
);
