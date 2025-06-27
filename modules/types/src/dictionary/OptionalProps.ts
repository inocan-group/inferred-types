import type { EmptyObject, OptionalKeys, RemoveIndexKeys } from "inferred-types/types";

/**
 * **OptionalProps**
 *
 * Reduces an object to only key/value pairs where the key is optional
 */
export type OptionalProps<T extends object> =
EmptyObject extends RemoveIndexKeys<Pick<T, OptionalKeys<T>>>
    ? RemoveIndexKeys<Pick<T, OptionalKeys<T>>>
    : never;
