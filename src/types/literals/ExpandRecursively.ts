import { AnyObject } from "../boolean-logic";

/**
 * Recursively goes over an object based structure and tries to reduce
 * it down to just a simple key/value type.
 */
export type ExpandRecursively<T> = T extends AnyObject
  ? { [K in keyof T]: ExpandRecursively<T[K]> }
  : T;
