import { NonStringKeys } from "src/types";

/**
 * **WithStringKeys**`<T>`
 * 
 * Reduces an object to only the key/value pairs where the key is a
 * string.
 */
export type WithStringKeys<T extends object> = Omit<T, NonStringKeys<T>>;
