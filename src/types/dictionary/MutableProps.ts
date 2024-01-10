import { ReadonlyKeys } from "src/types";

/**
 * **MutableProps**`<T>`
 * 
 * Reduces an object down to just the key/value pairs which
 * are mutable.
 */
export type MutableProps<T extends object> = Omit<T, ReadonlyKeys<T>>;
