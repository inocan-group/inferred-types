import type { AnyObject } from "src/types/base-types";

/**
 * **IsContainer**`<T>`
 * 
 * Boolean operator which detects whether `T` is a "container" where a
 * container is any object or array.
 */
export type IsContainer<T> = T extends AnyObject
  ? true
  : T extends unknown[]
    ? true
    : false;
