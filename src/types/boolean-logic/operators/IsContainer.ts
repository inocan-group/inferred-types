/* eslint-disable @typescript-eslint/no-explicit-any */
import type {  IfNever, KV } from "src/types/index";

/**
 * **IsContainer**`<T>`
 * 
 * Boolean operator which detects whether `T` is a "container" where a
 * container is any object or array.
 */
export type IsContainer<T> = IfNever<
T, 
false,
[T] extends [KV]
  ? true
  : [T] extends [readonly any[]]
    ? true
    : false
>;
