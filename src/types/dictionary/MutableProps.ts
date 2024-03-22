import {  KV, ReadonlyKeys } from "src/types/index";

/**
 * **MutableProps**`<T>`
 * 
 * Reduces an object down to just the key/value pairs which
 * are mutable.
 */
export type MutableProps<T extends KV> = Omit<T, ReadonlyKeys<T>>;
