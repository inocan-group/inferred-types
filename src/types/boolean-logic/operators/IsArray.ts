/**
 * **IsArray**
 * 
 * Boolean utility which tests for whether `T` is an array (
 * both a mutable array or a readonly array)
 */
export type IsArray<T> = [T] extends [unknown[]] 
  ? true 
  : [T] extends [readonly unknown[]] 
    ? true 
    : false;
