import { Constant } from "src/constants";

/**
 * **ShouldFlatten**`<T>`
 * 
 * Used as an instruction for a higher level utility to ignore the value
 * or error found in `T`.
 */
export type ShouldIgnore<T> = Constant<"ShouldIgnore", T>;
