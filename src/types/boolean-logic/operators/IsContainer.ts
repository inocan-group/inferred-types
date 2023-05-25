/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AnyObject, IfNever } from "src/types";

/**
 * **IsContainer**`<T>`
 * 
 * Boolean operator which detects whether `T` is a "container" where a
 * container is any object or array.
 */
export type IsContainer<T> = IfNever<T, false,
[T] extends [AnyObject]
  ? true
  : [T] extends [any[]]
    ? true
    : false
>;
