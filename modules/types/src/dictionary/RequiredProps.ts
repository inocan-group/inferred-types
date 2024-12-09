import { AnyObject, RequiredKeys } from "inferred-types/types";

/**
 * **RequiredProps**`<T>`
 *
 * Reduces an object `T` to only those key/value pairs where the key is required
 */
export type RequiredProps<T extends AnyObject> = Pick<T, RequiredKeys<T>>;
