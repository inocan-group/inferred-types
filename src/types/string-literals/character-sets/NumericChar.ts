import { NUMERIC_CHAR } from "src/constants";
import { Mutable, TupleToUnion } from "src/types";

/**
 * **NumericChar**
 * 
 * Numeric string characters.
 * 
 * **Related:** `NUMERIC_CHAR`, `Digit`
 */
export type NumericChar = TupleToUnion<Mutable<typeof NUMERIC_CHAR>>;
