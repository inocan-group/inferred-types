import { Constant } from "src/constants";
import { Tuple } from "src/types";

/**
 * **ShouldFlatten**`<T>`
 * 
 * Used as an instruction for a higher level utility to flatten the results
 * of `T` rather than keeping in it's current state.
 */
export type ShouldFlatten<T extends Tuple> = Constant<"ShouldFlatten", T>;
