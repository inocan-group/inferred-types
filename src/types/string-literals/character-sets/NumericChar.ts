import { NON_ZERO_NUMERIC_CHAR, NUMERIC_CHAR } from "src/constants";
import { Mutable, TupleToUnion } from "../..";

/**
 * **NumericChar**
 * 
 * Numeric string characters.
 * 
 * **Related:** `NUMERIC_CHAR`, `Digit`
 */
export type NumericChar = TupleToUnion<Mutable<typeof NUMERIC_CHAR>>;

/**
 * **NonZeroNumericChar**
 * 
 * Numeric string characters with the exception of "0".
 */
export type NonZeroNumericChar = TupleToUnion<typeof NON_ZERO_NUMERIC_CHAR>;
