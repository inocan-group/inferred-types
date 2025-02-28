import type { AnyObject } from "src/base-types";

/**
 * **AsObject<T>**
 *
 * Proxies through any ony existing object, but will also
 * convert a `KeyValueTuple` into an object.
 */
export type AsObject<T> = T extends AnyObject
    ? T
    : never;
