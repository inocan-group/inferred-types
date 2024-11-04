import { NonNumericKeys } from "@inferred-types/types";

/**
 * **WithNumericKeys**`<T>`
 *
 * Reduces an object to only the key/value pairs where the key is numeric.
 */
export type WithNumericKeys<T extends object> = Omit<T, NonNumericKeys<T>>;
