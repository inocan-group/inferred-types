import { RequiredKeys } from "./RequiredKeys";

/**
 * **RequiredProps**`<T>`
 *
 * Reduces an object `T` to only those key/value pairs where the key is required
 */
export type RequiredProps<T extends object> = Pick<T, RequiredKeys<T>>;
