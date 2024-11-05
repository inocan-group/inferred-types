import { NUMERIC_DIGIT } from "inferred-types/dist/constants/index";

/**
 * **Digit**
 *
 * A single numeric digit.
 *
 * **Related:** `NumericChar`
 */
export type Digit = typeof NUMERIC_DIGIT[number];
