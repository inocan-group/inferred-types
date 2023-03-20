import { ReadonlyKeys } from "./ReadonlyKeys";

/**
 * **ReadonlyProps**`<T>`
 * 
 * Reduces an object down to just the key/value pairs which
 * are readonly.
 */
export type ReadonlyProps<T extends object> = Pick<T, ReadonlyKeys<T>>;
