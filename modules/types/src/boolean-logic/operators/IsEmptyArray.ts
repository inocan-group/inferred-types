

/**
 * Boolean operator which tests `T` for whether it is:
 *
 * 1. _an array_
 * 2. an _empty_ array with no known elements at design time
 *
 * If `T` is a wide type it will return `boolean`.
 */
export type IsEmptyArray<T> = T extends any[]
  ? number extends T["length"]
  ? boolean
  : T["length"] extends 0
  ? true
  : false
  : false;

