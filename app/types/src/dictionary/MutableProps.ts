import {  Dictionary, ReadonlyKeys } from "@inferred-types/types";

/**
 * **MutableProps**`<T>`
 *
 * Reduces an object down to just the key/value pairs which
 * are mutable.
 */
export type MutableProps<T extends Dictionary> = Omit<T, ReadonlyKeys<T>>;
