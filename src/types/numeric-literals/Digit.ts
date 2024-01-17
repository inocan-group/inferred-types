import { NUMERIC_DIGIT } from "src/constants/index";
import { Mutable, TupleToUnion } from "src/types/index";

/**
 * **Digit**
 * 
 * A single numeric digit.
 * 
 * **Related:** `NumericChar`
 */
export type Digit = TupleToUnion<Mutable<typeof NUMERIC_DIGIT>>;
