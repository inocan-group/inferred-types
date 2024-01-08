import { AnyObject, NonStringKeys } from "..";

/**
 * **WithStringKeys**`<T>`
 * 
 * Reduces an object to only the key/value pairs where the key is a
 * string.
 */
export type WithStringKeys<T extends AnyObject> = Omit<T, NonStringKeys<T>>;
