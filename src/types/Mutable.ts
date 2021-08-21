/**
 * Makes a readonly structure mutable
 */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
