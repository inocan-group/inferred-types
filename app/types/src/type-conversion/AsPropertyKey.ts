

/**
 * **AsPropertyKey**`<T>`
 * 
 * Ensures that `T` is a property key or, if a tuple is passed in, that
 * all values extend `PropertyKey`
 */
export type AsPropertyKey<T> = T extends PropertyKey
  ? T 
  : never;
