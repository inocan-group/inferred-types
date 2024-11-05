import { AnyObject, RequiredKeys } from "inferred-types/dist/types/index";

/**
 * **RequiredProps**`<T>`
 *
 * Reduces an object `T` to only those key/value pairs where the key is required
 */
export type RequiredProps<T extends AnyObject> = Pick<T, RequiredKeys<T>>;
