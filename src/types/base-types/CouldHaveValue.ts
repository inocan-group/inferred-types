import { Something, Nothing } from "src/types";

/**
 * **CouldHaveValue**
 * 
 * This is functionally equivalent to the "unknown" type but expressed in a
 * more explicit manner.
 * 
 * From this we see that _unknown_ represents both "nothing" or "something":
 * 
 * - nothing: aka, `undefined` or `null`
 * - something: aka, `{}`
 */
export type CouldHaveValue = Something | Nothing;
