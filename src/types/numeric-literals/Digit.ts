import { NUMERIC_DIGIT } from "src/constants";
import { Mutable, TupleToUnion } from "src/types";

/**
 * **Digit**
 * 
 * A single numeric digit.
 * 
 * **Related:** `NumericChar`
 */
export type Digit = TupleToUnion<Mutable<typeof NUMERIC_DIGIT>>;
