import { OptionalKeys } from "src/types/index";

/**
 * **OptionalProps**
 *
 * Reduces an object to only key/value pairs where the key is optional
 */
export type OptionalProps<T extends object> = Pick<T, OptionalKeys<T>>;
